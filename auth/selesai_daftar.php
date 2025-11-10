<?php
require_once '../config/functions.php';

// Redirect jika belum register
if (!isset($_SESSION['registration_success'])) {
    redirect('daftar.php');
}

// Hapus session setelah ditampilkan
unset($_SESSION['registration_success']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pendaftaran Berhasil - BersihXpress</title>
    
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
            
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Selamat Bergabung!</h1>
            
            <div class="space-y-4 mb-8">
                <p class="text-gray-600">Akun Anda telah berhasil dibuat. Selamat datang di BersihXpress!</p>
                <p class="text-gray-500">Mulai dari pencatatan transaksi, cetak nota, laporan keuangan, hingga
                    perhitungan gaji karyawan, semua fitur yang Anda butuhkan ada di sini.</p>
            </div>

            <button onclick="window.location.href='masuk.php'"
                class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                Mulai Sekarang
            </button>
        </div>
    </main>

    <script src="../assets/js/icons.js"></script>
    <script src="../assets/js/main.js"></script>
</body>
</html>