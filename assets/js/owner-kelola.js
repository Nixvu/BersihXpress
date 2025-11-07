/**
 * ======================================================
 * SCRIPT KHUSUS: owner/kelola.html
 * Meng-handle:
 * 1. Logika modal "Profil Usaha"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN MODAL ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalProfilUsaha = document.getElementById('modal-profil-usaha');
    const btnProfilUsaha = document.getElementById('btn-profil-usaha');
    const closeButtons = document.querySelectorAll('.btn-close-modal');

    // --- FUNGSI HELPER ---
    function openModal(modalElement) {
        if (!modalElement) return;
        modalContainer.classList.remove('hidden');
        modalBackdrop.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
        modalElement.classList.remove('hidden');
        requestAnimationFrame(() => {
            modalElement.style.transform = 'translateY(0)';
        });
    }

    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.transform = 'translateY(100%)';
        setTimeout(() => {
            modalElement.classList.add('hidden');
            const anyModalOpen = document.querySelectorAll('.modal-popup:not(.hidden)').length > 0;
            if (!anyModalOpen) {
                modalBackdrop.classList.add('opacity-0');
                setTimeout(() => {
                    modalContainer.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }, 300);
    }

    // --- EVENT LISTENERS ---
    btnProfilUsaha.addEventListener('click', () => {
        openModal(modalProfilUsaha);
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(modalProfilUsaha);
        });
    });

    modalBackdrop.addEventListener('click', () => {
        closeModal(modalProfilUsaha);
    });
});