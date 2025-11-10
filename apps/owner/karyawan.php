<?php
require_once __DIR__ . '/middleware/auth_owner.php';
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Karyawan - BersihXpress</title>

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
            <h1 class="text-2xl font-bold text-white">Kelola Karyawan</h1>
            <p class="text-sm opacity-90 text-white">BersihXpress</p>

            <div class="flex items-center space-x-3 mt-4">
                <div class="relative flex-grow">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                            data-feather="search" class="h-5 w-5 text-gray-400"></svg></span>
                    <input type="text" class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                        placeholder="Cari Nama Karyawan...">
                </div>
                <button id="btn-tambah-karyawan" class="bg-white p-3 rounded-lg shadow flex-shrink-0">
                    <svg data-feather="user-plus" class="h-6 w-6 text-blue-600"></svg>
                </button>
            </div>
        </header>

        <main class="flex-grow overflow-y-auto p-6 space-y-3 no-scrollbar pb-24">

            <button
                class="btn-buka-opsi w-full bg-white rounded-lg shadow p-4 text-left flex items-center justify-between"
                data-nama="Rahmat Hidayat">
                <div class="flex items-center">
                    <div class="p-3 bg-gray-100 rounded-full mr-4"><svg data-feather="user-check"
                            class="w-5 h-5 text-gray-600"></svg></div>
                    <div>
                        <p class="text-base font-bold text-gray-900">Rahmat Hidayat</p>
                        <p class="text-sm text-gray-500">Peran: Karyawan</p>
                        <p class="text-sm text-gray-500">No HP: 081234567890</p>
                    </div>
                </div>
                <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></svg>
            </button>

            <button
                class="btn-buka-opsi w-full bg-white rounded-lg shadow p-4 text-left flex items-center justify-between"
                data-nama="Siti Aminah">
                <div class="flex items-center">
                    <div class="p-3 bg-gray-100 rounded-full mr-4"><svg data-feather="user-check"
                            class="w-5 h-5 text-gray-600"></svg></div>
                    <div>
                        <p class="text-base font-bold text-gray-900">Siti Aminah</p>
                        <p class="text-sm text-gray-500">Peran: Karyawan</p>
                        <p class="text-sm text-gray-500">No HP: 089876543210</p>
                    </div>
                </div>
                <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></svg>
            </button>

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

    <div id="modal-container" class="hidden z-30">

        <div id="modal-backdrop" class="modal-backdrop fixed inset-0 bg-black/50 z-40 opacity-0"></div>

        <div id="modal-opsi-karyawan"
            class="modal-popup fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl z-50 flex flex-col h-auto">
            <div class="flex-shrink-0">
                <div class="w-full py-3">
                    <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
                </div>
                <div class="flex justify-between items-center px-6 pb-4">
                    <h2 class="text-xl font-bold text-gray-900" id="opsi-nama-karyawan">Opsi Karyawan</h2>
                    <button class="btn-close-modal p-1 text-gray-500 hover:text-gray-800"
                        data-modal-id="modal-opsi-karyawan">
                        <svg data-feather="x" class="w-6 h-6"></svg>
                    </button>
                </div>
            </div>
            <div class="px-6 space-y-3">

                <button id="btn-info-kinerja"
                    class="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-left hover:bg-gray-50">
                    <div class="flex items-center">
                        <div class="p-2 bg-gray-100 rounded-lg mr-3"><svg data-feather="bar-chart-2"
                                class="w-5 h-5 text-gray-700"></svg></div>
                        <div>
                            <p class="font-semibold text-gray-800">Informasi Kinerja</p>
                            <p class="text-sm text-gray-500">Lihat kehadiran & transaksi selesai</p>
                        </div>
                    </div>
                    <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400"></svg>
                </button>

                <button id="btn-edit-karyawan"
                    class="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-left hover:bg-gray-50">
                    <div class="flex items-center">
                        <div class="p-2 bg-gray-100 rounded-lg mr-3"><svg data-feather="edit"
                                class="w-5 h-5 text-gray-700"></svg></div>
                        <div>
                            <p class="font-semibold text-gray-800">Edit Data Karyawan</p>
                            <p class="text-sm text-gray-500">Ubah nama, no hp, atau peran</p>
                        </div>
                    </div>
                    <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400"></svg>
                </button>
                <button id="btn-reset-password"
                    class="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-left hover:bg-gray-50">
                    <div class="flex items-center">
                        <div class="p-2 bg-gray-100 rounded-lg mr-3"><svg data-feather="key"
                                class="w-5 h-5 text-gray-700"></svg></div>
                        <div>
                            <p class="font-semibold text-gray-800">Reset Password</p>
                            <p class="text-sm text-gray-500">Buat password baru untuk karyawan</p>
                        </div>
                    </div>
                    <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400"></svg>
                </button>
                <button id="btn-hapus-karyawan"
                    class="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-left hover:bg-gray-50">
                    <div class="flex items-center">
                        <div class="p-2 bg-gray-100 rounded-lg mr-3"><svg data-feather="trash-2"
                                class="w-5 h-5 text-red-600"></svg></div>
                        <div>
                            <p class="font-semibold text-red-600">Hapus Karyawan</p>
                            <p class="text-sm text-gray-500">Hapus akun dan data karyawan</p>
                        </div>
                    </div>
                    <svg data-feather="chevron-right" class="w-5 h-5 text-gray-400"></svg>
                </button>
            </div>
            <div class="flex-shrink-0 p-6 bg-white">
                <button
                    class="btn-close-modal w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50"
                    data-modal-id="modal-opsi-karyawan">
                    Batal
                </button>
            </div>
        </div>

        <div id="modal-edit-karyawan"
            class="modal-popup hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl z-50 flex flex-col h-[90vh]">
            <div class="flex-shrink-0">
                <div class="w-full py-3">
                    <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
                </div>
                <div class="flex justify-between items-center px-6 pb-4">
                    <h2 class="text-xl font-bold text-gray-900">Edit Data Karyawan</h2>
                    <button class="btn-close-modal p-1 text-gray-500 hover:text-gray-800"
                        data-modal-id="modal-edit-karyawan">
                        <svg data-feather="x" class="w-6 h-6"></svg>
                    </button>
                </div>
            </div>
            <div class="flex-grow overflow-y-auto p-6 no-scrollbar">
                <form id="form-edit-karyawan" class="space-y-4">
                    <div><label for="edit_nama" class="text-sm font-medium text-gray-600">Nama Lengkap</label>
                        <div class="relative mt-1"><span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                    data-feather="user" class="h-5 w-5 text-gray-400"></svg></span>
                            <input type="text" id="edit_nama"
                                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg" value="Rahmat Hidayat">
                        </div>
                    </div>
                    <div><label for="edit_no_hp" class="text-sm font-medium text-gray-600">No Handphone</label>
                        <div class="relative mt-1"><span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                    data-feather="phone" class="h-5 w-5 text-gray-400"></svg></span>
                            <input type="tel" id="edit_no_hp"
                                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg" value="081234567890">
                        </div>
                    </div>
                    <div>
                        <label for="edit_peran" class="text-sm font-medium text-gray-600">Peran</label>
                        <select id="edit_peran"
                            class="w-full mt-1 py-3 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>-- Pilih Peran --</option>
                            <option selected>Karyawan</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="flex-shrink-0 p-6 bg-white border-t border-gray-200">
                <button type="submit" form="form-edit-karyawan"
                    class="btn-simpan w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700"
                    data-modal-id="modal-edit-karyawan">
                    Simpan Perubahan
                </button>
            </div>
        </div>

        <div id="modal-tambah-karyawan"
            class="modal-popup hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-2xl z-50 flex flex-col h-[90vh]">
            <div class="flex-shrink-0">
                <div class="w-full py-3">
                    <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
                </div>
                <div class="flex justify-between items-center px-6 pb-4">
                    <h2 class="text-xl font-bold text-gray-900">Buat Akun Karyawan Baru</h2>
                    <button class="btn-close-modal p-1 text-gray-500 hover:text-gray-800"
                        data-modal-id="modal-tambah-karyawan">
                        <svg data-feather="x" class="w-6 h-6"></svg>
                    </button>
                </div>
            </div>
            <div class="flex-grow overflow-y-auto p-6 no-scrollbar">
                <form id="form-tambah-karyawan" class="space-y-4">
                    <div><label for="tambah_nama" class="text-sm font-medium text-gray-600">Nama Lengkap</label>
                        <div class="relative mt-1"><span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                    data-feather="user" class="h-5 w-5 text-gray-400"></svg></span>
                            <input type="text" id="tambah_nama"
                                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                                placeholder="Nama Lengkap Karyawan">
                        </div>
                    </div>
                    <div><label for="tambah_no_hp" class="text-sm font-medium text-gray-600">No Handphone</label>
                        <div class="relative mt-1"><span
                                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                    data-feather="phone" class="h-5 w-5 text-gray-400"></svg></span>
                            <input type="tel" id="tambah_no_hp"
                                class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                                placeholder="No Handphone Aktif">
                        </div>
                    </div>
                    <div>
                        <label for="tambah_peran" class="text-sm font-medium text-gray-600">Peran</label>
                        <select id="tambah_peran"
                            class="w-full mt-1 py-3 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>-- Pilih Peran --</option>
                            <option value="Karyawan">Karyawan</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div class="border-t pt-4 space-y-4">
                        <div><label for="tambah_username" class="text-sm font-medium text-gray-600">Username</label>
                            <div class="relative mt-1"><span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                        data-feather="user-check" class="h-5 w-5 text-gray-400"></svg></span>
                                <input type="text" id="tambah_username"
                                    class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Username untuk login">
                            </div>
                        </div>
                        <div><label for="tambah_password" class="text-sm font-medium text-gray-600">Password
                                Awal</label>
                            <div class="relative mt-1"><span
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg
                                        data-feather="lock" class="h-5 w-5 text-gray-400"></svg></span>
                                <input type="password" id="tambah_password"
                                    class="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Password untuk login">
                            </div>
                        </div>
                        <div><label for="konfirmasi_password" class="text-sm font-medium text-gray-600">Konfirmasi
                                Password</label>
                            <div class="relative mt-1"><span
                                