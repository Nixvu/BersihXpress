<?php
require_once __DIR__ . '/middleware/auth_owner.php';
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tentang - BersihXpress</title>

    <link rel="stylesheet" href="../../assets/css/style.css">
        <link rel="stylesheet" href="../../assets/css/webview.css">
    <script src="../../assets/js/webview.js"></script>
    <script src="../../assets/js/tailwind.js"></script>
</head>

<body class="bg-gray-100 flex flex-col h-screen">
    <div id="loading-overlay" class="loading-container">
        <img src="../../assets/images/loading.gif" alt="Memuat..." class="loading-indicator">
    </div>

    <div id="main-content" class="flex flex-col flex-grow overflow-hidden">

        <header class="sticky top-0 z-10 bg-blue-600 rounded-b-[32px] p-6 shadow-lg flex-shrink-0">
            <h1 class="text-2xl font-bold text-white">Tentang BersihXpress</h1>
            <p class="text-sm opacity-90 text-white">Informasi aplikasi dan versi</p>
        </header>

        <main class="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar pb-24">

            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Tentang Aplikasi</h3>
                <p class="text-sm text-gray-600">BersihXpress adalah aplikasi manajemen laundry sederhana untuk pemilik usaha
                    laundry. Versi ini dibuat untuk demonstrasi dan keperluan kerjapraktek.</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Versi</h3>
                <p class="text-sm text-gray-600">v1.0.0</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Kontak</h3>
                <p class="text-sm text-gray-600">Email: support@bersihxpress.example</p>
            </div>

        </main>
    </div>

    <nav
        class="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-5 gap-2 px-4 py-3 shadow-[0_-2px_5px_rgba(0,0,0,0.05)] flex-shrink-0 z-20">
        <a href="kelola.php" class="flex flex-col items-center text-blue-600 bg-blue-100 rounded-lg px-4 py-2">
            <svg data-feather="grid" class="w-6 h-6"></svg>
            <span class="text-xs mt-1 font-semibold">Kelola</span>
        </a>
        <a href="transaksi.php" class="flex flex-col items-center text-gray-500 px-4 py-2">
            <svg data-feather="file-text" class="w-6 h-6"></svg>
            <span class="text-xs mt-1">Transaksi</span>
        </a>
        <a href="dashboard.php" class="flex flex-col items-center text-gray-500 px-4 py-2">
            <svg data-feather="home" class="w-6 h-6"></svg>
            <span class="text-xs mt-1">Beranda</span>
        </a>
        <a href="laporan.php" class="flex flex-col items-center text-gray-500 px-4 py-2">
            <svg data-feather="bar-chart-2" class="w-6 h-6"></svg>
            <span class="text-xs mt-1">Laporan</span>
        </a>
        <a href="profile.php" class="flex flex-col items-center text-gray-500 px-4 py-2">
            <svg data-feather="user" class="w-6 h-6"></svg>
            <span class="text-xs mt-1">Akun</span>
        </a>
    </nav>

    <script src="../../assets/js/icons.js"></script>
    <script src="../../assets/js/main.js"></script>
</body>

</html>