<?php
function getHeaderHTML($title) {
    return <<<HTML
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title} - BersihXpress</title>

    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/webview.css">
    <script src="../../assets/js/webview.js"></script>
    <script src="../../assets/js/tailwind.js"></script>
HTML;
}

function getNavbarHTML($active = 'beranda') {
    $items = [
        'beranda' => [
            'icon' => 'home',
            'text' => 'Beranda',
            'link' => 'dashboard.php'
        ],
        'laporan' => [
            'icon' => 'bar-chart-2',
            'text' => 'Laporan',
            'link' => 'laporan.php'
        ],
        'akun' => [
            'icon' => 'user',
            'text' => 'Akun',
            'link' => 'profile.php'
        ]
    ];

    $html = '<nav class="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50">';
    
    foreach ($items as $key => $item) {
        $isActive = $key === $active;
        $classes = $isActive
            ? 'flex flex-col items-center text-blue-600 bg-blue-100 rounded-lg px-4 py-2'
            : 'flex flex-col items-center text-gray-500 px-4 py-2';

        // Build small extra class separately to avoid using complex expressions inside heredoc
        $extraSpanClass = $isActive ? ' font-semibold' : '';

        $html .= <<<HTML
        <a href="{$item['link']}" class="{$classes}">
            <svg data-feather="{$item['icon']}" class="w-6 h-6"></svg>
            <span class="text-xs mt-1{$extraSpanClass}">{$item['text']}</span>
        </a>
HTML;
    }
    
    $html .= '</nav>';
    return $html;
}

function getLoadingOverlayHTML() {
    return <<<HTML
    <div id="loading-overlay" class="loading-container">
        <img src="../../assets/images/loading.gif" alt="Memuat..." class="loading-indicator">
    </div>
HTML;
}

function getScriptsHTML() {
    return <<<HTML
    <script src="../../assets/js/icons.js"></script>
    <script src="../../assets/js/main.js"></script>
HTML;
}
?>