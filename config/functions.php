<?php
session_start();

function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function getUserRole() {
    return $_SESSION['role'] ?? null;
}

function redirect($path) {
    header("Location: $path");
    exit();
}

function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function generateOTP() {
    return str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function sendResponse($success, $message, $data = null, $statusCode = 200) {
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data
    ];
    
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}

function formatMoney($amount) {
    return 'Rp' . number_format($amount, 0, ',', '.');
}

// Fungsi untuk mengecek apakah request berasal dari Android WebView
function isAndroidWebView() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    return (strpos($userAgent, 'wv') !== false || strpos($userAgent, 'WebView') !== false);
}

// Fungsi untuk memastikan akses hanya dari Android WebView
function enforceAndroidWebView() {
    if (!isAndroidWebView()) {
        sendResponse(false, 'Akses ditolak. Aplikasi hanya dapat diakses melalui Android.');
    }
}

// Fungsi untuk logging
function logError($message, $context = []) {
    $logFile = __DIR__ . '/../logs/error.log';
    $timestamp = date('Y-m-d H:i:s');
    $contextStr = !empty($context) ? json_encode($context) : '';
    $logMessage = "[$timestamp] $message $contextStr\n";
    error_log($logMessage, 3, $logFile);
}
?>