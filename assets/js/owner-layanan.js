/**
 * ======================================================
 * SCRIPT KHUSUS: owner/layanan.html
 * Meng-handle:
 * 1. Logika modal bertingkat (Opsi -> Edit / Hapus)
 * 2. Logika modal "Tambah Layanan"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const btnsBukaOpsi = document.querySelectorAll('.btn-buka-opsi');
    const btnTambahLayanan = document.getElementById('btn-tambah-layanan');
    const modalOpsiLayanan = document.getElementById('modal-opsi-layanan');
    const modalEditLayanan = document.getElementById('modal-edit-layanan');
    const modalTambahLayanan = document.getElementById('modal-tambah-layanan');
    const modalHapusLayanan = document.getElementById('modal-hapus-layanan');
    const btnEditLayanan = document.getElementById('btn-edit-layanan');
    const btnHapusLayanan = document.getElementById('btn-hapus-layanan');
    const btnsCloseModal = document.querySelectorAll('.btn-close-modal');
    const btnsCloseCentered = document.querySelectorAll('.btn-close-centered');
    const btnsSimpan = document.querySelectorAll('.btn-simpan');
    const btnHapusConfirm = document.querySelector('.btn-hapus-confirm');

    // --- FUNGSI HELPER ---
    function openModal(modalElement) {
        if (!modalElement) return;
        modalContainer.classList.remove('hidden');
        modalBackdrop.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
        modalElement.classList.remove('hidden');
        requestAnimationFrame(() => modalElement.style.transform = 'translateY(0)');
    }

    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.transform = 'translateY(100%)';
        setTimeout(() => {
            modalElement.classList.add('hidden');
            const anySlideModalOpen = document.querySelectorAll('.modal-popup:not(.hidden)').length === 0;
            const anyCenteredModalOpen = document.querySelectorAll('.modal-centered:not(.hidden)').length === 0;
            if (anySlideModalOpen && anyCenteredModalOpen) {
                closeBackdrop();
            }
        }, 300);
    }

    function openModalCentered(modalElement) {
        if (!modalElement) return;
        modalContainer.classList.remove('hidden');
        modalBackdrop.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
        modalElement.classList.remove('hidden');
        requestAnimationFrame(() => {
            modalElement.classList.add('modal-centered-active');
        });
    }

    function closeModalCentered(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('modal-centered-active');
        setTimeout(() => {
            modalElement.classList.add('hidden');
            const anySlideModalOpen = document.querySelectorAll('.modal-popup:not(.hidden)').length === 0;
            if (anySlideModalOpen) {
                closeBackdrop();
            }
        }, 200);
    }

    function closeBackdrop() {
        modalBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-popup').forEach(closeModal);
        document.querySelectorAll('.modal-centered').forEach(closeModalCentered);
    }

    // --- PASANG EVENT LISTENERS ---
    btnsBukaOpsi.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalOpsiLayanan));
    });

    btnTambahLayanan.addEventListener('click', () => {
        openModal(modalTambahLayanan);
    });

    btnEditLayanan.addEventListener('click', () => {
        closeModal(modalOpsiLayanan);
        openModal(modalEditLayanan);
    });

    btnHapusLayanan.addEventListener('click', () => {
        closeModal(modalOpsiLayanan);
        openModalCentered(modalHapusLayanan);
    });

    btnsCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            if (modalId === 'modal-edit-layanan') {
                closeModal(modalToClose);
                openModal(modalOpsiLayanan);
            } else {
                closeAllModals();
            }
        });
    });

    btnsSimpan.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menyimpan data...');
            closeAllModals();
        });
    });

    btnsCloseCentered.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModalCentered(modalToClose);
            openModal(modalOpsiLayanan);
        });
    });

    btnHapusConfirm.addEventListener('click', () => {
        console.log('Menghapus data layanan...');
        closeAllModals();
    });

    modalBackdrop.addEventListener('click', closeAllModals);
});