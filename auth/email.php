<?php
require_once '../config/functions.php';

// Redirect jika sudah login
if (isLoggedIn()) {
    $redirect = getUserRole() === 'owner' ? '/apps/owner/dashboard.php' : '/apps/karyawan/dashboard.php';
    redirect($redirect);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - BersihXpress</title>
    
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
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
            <div class="text-center mb-8">
                <img src="../assets/images/illustrations/Logo.svg" alt="BersihXpress Logo" class="w-40 mx-auto mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Reset Kata Sandi</h1>
                <p class="text-gray-600 mt-2">Masukkan email untuk reset kata sandi</p>
            </div>

            <form id="resetForm" class="space-y-4">
                <input type="hidden" name="action" value="reset_password">

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                    Reset Kata Sandi
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-gray-600">
                    Kembali ke
                    <a href="masuk.php" class="text-blue-600 hover:text-blue-700 font-medium">halaman masuk</a>
                </p>
            </div>
        </div>
    </main>

    <script src="../assets/js/icons.js"></script>
    <script src="../assets/js/main.js"></script>
    <script>
        document.getElementById('resetForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('api/auth.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'otp_sandi.php';
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