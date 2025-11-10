<?php
require_once '../config/functions.php';

// Redirect jika tidak ada session register_otp
if (!isset($_SESSION['register_otp'])) {
    redirect('daftar.php');
}

// Cek expired OTP
if (time() > $_SESSION['register_otp']['expires']) {
    unset($_SESSION['register_otp']);
    redirect('daftar.php');
}

$email = $_SESSION['register_otp']['email'];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi OTP - BersihXpress</title>
    
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/webview.css">
    <script src="../assets/js/webview.js"></script>
    <script src="../assets/js/tailwind.js"></script>
</head>
<body class="bg-gray-100 flex flex-col min-h-screen">
    <div id="loading-overlay" class="loading-container">
        <img src="../assets/images/loading.gif" alt="Memuat..." class="loading-indicator">
    </div>

    <main class="flex-grow flex items-center justify-center p-6">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <div class="text-center mb-8">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">Verifikasi Email</h1>
                    <p class="text-gray-600">Masukkan kode OTP yang telah dikirim ke email:</p>
                    <p class="text-gray-900 font-medium mt-2"><?php echo htmlspecialchars($email); ?></p>
                </div>

                <form id="otpForm" class="space-y-6">
                    <input type="hidden" name="action" value="verify_otp">
                    <input type="hidden" name="type" value="register">

                    <div class="flex justify-center space-x-4">
                        <?php for($i = 1; $i <= 6; $i++): ?>
                        <input type="text" maxlength="1" 
                            class="w-12 h-12 text-center text-2xl font-bold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            data-otp-input required>
                        <?php endfor; ?>
                    </div>

                    <input type="hidden" name="otp" id="otpFinal">

                    <button type="submit"
                        class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                        Verifikasi
                    </button>
                </form>

                <div class="mt-6 text-center">
                    <p class="text-gray-600">
                        Tidak menerima kode?
                        <button type="button" id="resendOTP" class="text-blue-600 hover:text-blue-700 font-medium">
                            Kirim ulang
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </main>

    <script src="../assets/js/icons.js"></script>
    <script src="../assets/js/main.js"></script>
    <script>
        // OTP input handling
        const otpInputs = document.querySelectorAll('[data-otp-input]');
        const otpFinal = document.getElementById('otpFinal');

        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });

        // Form submission
        document.getElementById('otpForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Combine OTP digits
            const otp = Array.from(otpInputs).map(input => input.value).join('');
            otpFinal.value = otp;
            
            const formData = new FormData(this);
            
            fetch('api/auth.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.data.redirect;
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan sistem');
            });
        });

        // Resend OTP
        document.getElementById('resendOTP').addEventListener('click', function() {
            const formData = new FormData();
            formData.append('action', 'register');
            formData.append('email', '<?php echo $email; ?>');
            
            fetch('api/auth.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Kode OTP baru telah dikirim');
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan sistem');
            });
        });
    </script>
</body>
</html>