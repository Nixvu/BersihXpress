<?php
define('DB_HOST', 'sql100.infinityfree.com');
define('DB_USER', 'if0_40382042');
define('DB_PASS', 'fnKb5IuHTPuK84');
define('DB_NAME', 'if0_40382042_bersihxpress');

try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Koneksi database gagal: " . $e->getMessage();
    exit();
}
?>