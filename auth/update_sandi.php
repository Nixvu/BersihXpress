<?php
require_once '../config/functions.php';

// Redirect jika tidak ada session reset_otp yang terverifikasi
if (!isset($_SESSION['reset_otp']) || !isset($_SESSION['reset_otp']['verified'])) {
    redirect('email.php');
}

$email = $_SESSION['reset_otp']['email'];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Password - BersihXpress</title>
    
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
                <h1 class="text-2xl font-bold text-gray-900">Buat Kata Sandi Baru</h1>
                <p class="text-gray-600 mt-2">Masukkan kata sandi baru untuk akun Anda</p>
            </div>

            <form id="updatePasswordForm" class="space-y-4">
                <input type="hidden" name="action" value="update_password">
                <input type="hidden" name="email" value="<?php echo htmlspecialchars($email); ?>">

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                    <input type="password" id="password" name="password" required minlength="6"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>

                <div>
                    <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                    <input type="password" id="confirm_password" name="confirm_password" required minlength="6"
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>

                <button type="submit"
                    class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                    Simpan Kata Sandi Baru
                </button>
            </form>
        </div>
    </main>

    <script src="../assets/js/icons.js"></script>
    <script src="../assets/js/main.js"></script>
    <script>
        document.getElementById('updatePasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            
            if (password !== confirmPassword) {
                alert('Konfirmasi kata sandi tidak cocok');
                return;
            }
            
            const formData = new FormData(this);
            
            fetch('api/auth.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'selesai_sandi.php';
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