<?php
require_once __DIR__ . '/middleware/auth_owner.php';
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pelanggan - BersihXpress</title>

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
            <h1 class="text-2xl font-bold text-white">Pelanggan</h1>
            <p class="text-sm opacity-90 text-white">Kelola data pelanggan Anda</p>

            <div class="flex items-center space-x-3 mt-4">
                <div class="relative flex-grow">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                            data-feather="search" class="h-5 w-5 text-gray-400"></svg></span>
                    <input type="text" class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="Cari berdasarkan nama atau HP...">
                </div>
                <button id="btn-tambah-pelanggan" class="bg-white p-3 rounded-lg shadow flex-shrink-0">
                    <svg data-feather="plus" class="h-6 w-6 text-blue-600"></svg>
                </button>
            </div>
        </header>

        <main class="flex-grow overflow-y-auto p-6 space-y-3 no-scrollbar pb-24">

            <!-- Contoh Item Pelanggan -->
            <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <svg data-feather="user" class="w-5 h-5 text-gray-500"></svg>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900">Aji Nugraha</p>
                        <p class="text-sm text-gray-500">0812-3456-7890</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="btn-detail-pelanggan bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">Detail</button>
                    <button class="btn-hapus-pelanggan bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">Hapus</button>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <svg data-feather="user" class="w-5 h-5 text-gray-500"></svg>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900">Siti Aminah</p>
                        <p class="text-sm text-gray-500">0813-9876-5432</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="btn-detail-pelanggan bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">Detail</button>
                    <button class="btn-hapus-pelanggan bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">Hapus</button>
                </div>
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
    <script src="../../assets/js/owner-pelanggan.js"></script>
</body>

</html>