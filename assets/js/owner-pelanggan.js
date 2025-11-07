/**
 * ======================================================
 * SCRIPT KHUSUS: owner/pelanggan.html
 * Meng-handle:
 * 1. Logika modal bertingkat (Opsi -> Info/Edit/Hapus)
 * 2. Logika modal "Tambah Pelanggan"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const btnsBukaOpsi = document.querySelectorAll('.btn-buka-opsi');
    const btnTambahPelanggan = document.getElementById('btn-tambah-pelanggan');
    const modalOpsiPelanggan = document.getElementById('modal-opsi-pelanggan');
    const modalEditPelanggan = document.getElementById('modal-edit-pelanggan');
    const modalTambahPelanggan = document.getElementById('modal-tambah-pelanggan');
    const modalInfoTransaksi = document.getElementById('modal-info-transaksi');
    const modalHapusPelanggan = document.getElementById('modal-hapus-pelanggan');
    const btnInfoTransaksi = document.getElementById('btn-info-transaksi');
    const btnEditPelanggan = document.getElementById('btn-edit-pelanggan');
    const btnHapusPelanggan = document.getElementById('btn-hapus-pelanggan');
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
        btn.addEventListener('click', () => openModal(modalOpsiPelanggan));
    });

    btnTambahPelanggan.addEventListener('click', () => {
        openModal(modalTambahPelanggan);
    });

    btnInfoTransaksi.addEventListener('click', () => {
        closeModal(modalOpsiPelanggan);
        openModal(modalInfoTransaksi);
    });

    btnEditPelanggan.addEventListener('click', () => {
        closeModal(modalOpsiPelanggan);
        openModal(modalEditPelanggan);
    });

    btnHapusPelanggan.addEventListener('click', () => {
        closeModal(modalOpsiPelanggan);
        openModalCentered(modalHapusPelanggan);
    });

    btnsCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            if (modalId === 'modal-info-transaksi' || modalId === 'modal-edit-pelanggan') {
                closeModal(modalToClose);
                openModal(modalOpsiPelanggan);
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
            openModal(modalOpsiPelanggan);
        });
    });

    btnHapusConfirm.addEventListener('click', () => {
        console.log('Menghapus data pelanggan...');
        closeAllModals();
    });

    modalBackdrop.addEventListener('click', closeAllModals);
});