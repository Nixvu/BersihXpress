<?php
require_once '../config/database.php';
require_once '../config/functions.php';

// Pastikan request dari Android WebView
enforceAndroidWebView();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch($action) {
        case 'login':
            handleLogin();
            break;
        case 'register':
            handleRegister();
            break;
        case 'verify_otp':
            handleOTPVerification();
            break;
        case 'reset_password':
            handleResetPassword();
            break;
        default:
            sendResponse(false, 'Invalid action');
    }
}

function handleLogin() {
    global $conn;
    
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        sendResponse(false, 'Email dan password harus diisi');
    }
    
    try {
        $stmt = $conn->prepare("SELECT user_id, password, role, nama_lengkap FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['nama'] = $user['nama_lengkap'];
            
            // Redirect berdasarkan role
            $redirect = $user['role'] === 'owner' ? '/apps/owner/dashboard.php' : '/apps/karyawan/dashboard.php';
            sendResponse(true, 'Login berhasil', ['redirect' => $redirect]);
        } else {
            sendResponse(false, 'Email atau password salah');
        }
    } catch (PDOException $e) {
        logError('Login error', ['email' => $email, 'error' => $e->getMessage()]);
        sendResponse(false, 'Terjadi kesalahan sistem');
    }
}

function handleRegister() {
    global $conn;
    
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $nama = sanitize($_POST['nama_lengkap'] ?? '');
    $no_telepon = sanitize($_POST['no_telepon'] ?? '');
    
    if (empty($email) || empty($password) || empty($nama)) {
        sendResponse(false, 'Semua field harus diisi');
    }
    
    if (!validateEmail($email)) {
        sendResponse(false, 'Format email tidak valid');
    }
    
    try {
        // Cek email sudah terdaftar
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            sendResponse(false, 'Email sudah terdaftar');
        }
        
        // Generate OTP dan simpan ke session
        $otp = generateOTP();
        $_SESSION['register_otp'] = [
            'code' => $otp,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'nama' => $nama,
            'no_telepon' => $no_telepon,
            'expires' => time() + (15 * 60) // 15 menit
        ];
        
        // Dalam implementasi nyata, kirim OTP ke email
        // Untuk development, tampilkan OTP
        sendResponse(true, 'OTP telah dikirim ke email', ['otp' => $otp]);
        
    } catch (PDOException $e) {
        logError('Register error', ['email' => $email, 'error' => $e->getMessage()]);
        sendResponse(false, 'Terjadi kesalahan sistem');
    }
}

function handleOTPVerification() {
    global $conn;
    
    $otp = sanitize($_POST['otp'] ?? '');
    $type = sanitize($_POST['type'] ?? 'register'); // register atau reset
    
    if (empty($otp)) {
        sendResponse(false, 'OTP harus diisi');
    }
    
    $session_key = $type . '_otp';
    if (!isset($_SESSION[$session_key]) || time() > $_SESSION[$session_key]['expires']) {
        sendResponse(false, 'OTP telah kadaluarsa');
    }
    
    if ($otp !== $_SESSION[$session_key]['code']) {
        sendResponse(false, 'OTP tidak valid');
    }
    
    if ($type === 'register') {
        try {
            $user_id = generateUUID();
            $stmt = $conn->prepare("INSERT INTO users (user_id, email, password, role, nama_lengkap, no_telepon) VALUES (?, ?, ?, 'owner', ?, ?)");
            $stmt->execute([
                $user_id,
                $_SESSION[$session_key]['email'],
                $_SESSION[$session_key]['password'],
                $_SESSION[$session_key]['nama'],
                $_SESSION[$session_key]['no_telepon']
            ]);
            
            unset($_SESSION[$session_key]);
            sendResponse(true, 'Registrasi berhasil', ['redirect' => '/auth/selesai_daftar.php']);
            
        } catch (PDOException $e) {
            logError('OTP verification error', ['error' => $e->getMessage()]);
            sendResponse(false, 'Terjadi kesalahan sistem');
        }
    } else {
        // Handle reset password
        sendResponse(true, 'Verifikasi OTP berhasil', ['redirect' => '/auth/update_sandi.php']);
    }
}

function handleResetPassword() {
    global $conn;
    
    $email = sanitize($_POST['email'] ?? '');
    
    if (empty($email)) {
        sendResponse(false, 'Email harus diisi');
    }
    
    try {
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($user = $stmt->fetch()) {
            $otp = generateOTP();
            $_SESSION['reset_otp'] = [
                'code' => $otp,
                'email' => $email,
                'user_id' => $user['user_id'],
                'expires' => time() + (15 * 60)
            ];
            
            // Dalam implementasi nyata, kirim OTP ke email
            sendResponse(true, 'OTP telah dikirim ke email', ['otp' => $otp]);
        } else {
            sendResponse(false, 'Email tidak terdaftar');
        }
    } catch (PDOException $e) {
        logError('Reset password error', ['email' => $email, 'error' => $e->getMessage()]);
        sendResponse(false, 'Terjadi kesalahan sistem');
    }
}