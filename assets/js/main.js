/**
 * ======================================================
 * SCRIPT GLOBAL (main.js)
 * Dimuat di semua halaman.
 * Meng-handle:
 * 1. Animasi loading screen (fade-out)
 * 2. Inisialisasi Feather Icons (feather.replace())
 * ======================================================
 */

window.addEventListener('load', () => {
    
    // 1. Sembunyikan Loading Screen
    const body = document.body;
    body.classList.add('is-loaded');
    
    setTimeout(() => {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.remove();
        }
    }, 500); // Samakan dengan durasi transisi CSS (0.5s)

    // 2. Inisialisasi Feather Icons
    // Kita jalankan setelah 'load' untuk memastikan semua ikon sudah ada di DOM
    if (typeof feather !== 'undefined') {
        feather.replace();
    } else {
        console.warn('Feather Icons (icons.js) belum dimuat.');
    }
});

// Low-risk auto-fill: ensure forms have names/method/action for PHP POST when missing.
// This runs at page load and is intentionally conservative: it only sets values when absent
// and uses the element id as the field name to avoid changing JS that references ids.
window.addEventListener('load', () => {
    try {
        const path = window.location.pathname || '';
        document.querySelectorAll('form').forEach(form => {
            // set method if not present
            if (!form.getAttribute('method')) {
                form.setAttribute('method', 'POST');
            }

            // set action placeholder if missing
            if (!form.getAttribute('action')) {
                let base = '/';
                if (path.includes('/apps/owner/')) base = '/owner/';
                else if (path.includes('/apps/karyawan/')) base = '/karyawan/';
                // fallback to root + form id
                const fid = form.id ? form.id : 'submit';
                form.setAttribute('action', base + fid + '.php');
            }

            // add name attributes for inputs/selects/textareas that have an id but no name
            form.querySelectorAll('input[id]:not([name]), select[id]:not([name]), textarea[id]:not([name])')
                .forEach(el => {
                    try { el.setAttribute('name', el.id); } catch (e) { /* ignore */ }
                });
        });
    } catch (err) {
        console.error('Auto-fill form-names failed:', err);
    }
});