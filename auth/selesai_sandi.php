<?php
require_once '../config/functions.php';

// Redirect jika belum reset password
if (!isset($_SESSION['password_reset_success'])) {
    redirect('email.php');
}

// Hapus session setelah ditampilkan
unset($_SESSION['password_reset_success']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Berhasil - BersihXpress</title>
    
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
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
            <img src="../assets/images/illustrations/success.svg" alt="Success" class="w-32 mx-auto mb-6">
            
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Kata Sandi Berhasil Diperbarui!</h1>
            
            <div class="space-y-4 mb-8">
                <p class="text-gray-600">Kata sandi Anda telah berhasil diperbarui.</p>
                <p class="text-gray-500">Silakan masuk kembali menggunakan kata sandi baru Anda.</p>
            </div>

            <button onclick="window.location.href='masuk.php'"
                class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                Masuk Sekarang
            </button>
        </div>
    </main>

    <script src="../assets/js/icons.js"></script>
    <script src="../assets/js/main.js"></script>
</body>
</html>