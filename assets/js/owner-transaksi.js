/**
 * ======================================================
 * SCRIPT KHUSUS: owner/transaksi.html
 * Meng-handle:
 * 1. Logika modal "Rincian" -> "Opsi Lanjutan"
 * 2. Logika modal "Tambah Transaksi" -> "Manual" / "Template" / "Pengeluaran"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH SEMUA ELEMEN YANG DIPERLUKAN ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // === ALUR 1: LIHAT RINCIAN ===
    const btnsBukaRincian = document.querySelectorAll('.btn-buka-rincian');
    const modalRincian = document.getElementById('modal-rincian');
    const btnCloseRincian = document.querySelector('.btn-close-rincian');
    const btnBukaOpsi = document.getElementById('btn-buka-opsi');
    const modalOpsiLanjutan = document.getElementById('modal-opsi-lanjutan');
    const btnsCloseNested = document.querySelectorAll('.btn-close-nested');
    const btnsSimpanNested = document.querySelectorAll('.btn-simpan-nested');

    // === ALUR 2: TAMBAH TRANSAKSI ===
    const btnTambahTransaksi = document.getElementById('btn-tambah-transaksi');
    const modalBuatTransaksi = document.getElementById('modal-buat-transaksi');
    const modalRincianTransaksi = document.getElementById('modal-rincian-transaksi'); // Form
    const modalPengeluaran = document.getElementById('modal-pengeluaran'); // Form
    const btnTransaksiManual = document.getElementById('btn-transaksi-manual');
    const btnPengeluaran = document.getElementById('btn-pengeluaran');
    const btnsCloseGlobal = document.querySelectorAll('.btn-close-global');
    const btnTransaksiTemplate = document.getElementById('btn-transaksi-template');
    const modalTransaksiTemplate = document.getElementById('modal-transaksi-template');

    // --- FUNGSI-FUNGSI HELPER MODAL ---
    function openModal(modalElement) {
        if (!modalElement) return;
        if (modalContainer.classList.contains('hidden')) {
            modalContainer.classList.remove('hidden');
            modalBackdrop.classList.remove('opacity-0');
            document.body.style.overflow = 'hidden';
        }
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
        }, 300);
    }

    function closeAllModals() {
        const allModals = [
            modalRincian, modalOpsiLanjutan,
            modalBuatTransaksi, modalRincianTransaksi, modalPengeluaran, modalTransaksiTemplate
        ];
        allModals.forEach(closeModal);
        modalBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // --- PASANG EVENT LISTENERS ---
    
    // === ALUR 1: LIHAT RINCIAN ===
    btnsBukaRincian.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalRincian));
    });

    btnBukaOpsi.addEventListener('click', () => {
        closeModal(modalRincian);
        openModal(modalOpsiLanjutan);
    });

    btnCloseRincian.addEventListener('click', closeAllModals);

    btnsCloseNested.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
            openModal(modalRincian); // Kembali ke Rincian
        });
    });

    btnsSimpanNested.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menyimpan perubahan dari Opsi Lanjutan...');
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
            openModal(modalRincian); // Kembali ke Rincian
        });
    });

    // === ALUR 2: TAMBAH TRANSAKSI ===
    btnTambahTransaksi.addEventListener('click', () => {
        openModal(modalBuatTransaksi);
    });
    btnTransaksiManual.addEventListener('click', () => {
        closeModal(modalBuatTransaksi);
        openModal(modalRincianTransaksi);
    });
    btnTransaksiTemplate.addEventListener('click', () => {
        closeModal(modalBuatTransaksi);
        openModal(modalTransaksiTemplate);
    });
    btnPengeluaran.addEventListener('click', () => {
        closeModal(modalBuatTransaksi);
        openModal(modalPengeluaran);
    });

    btnsCloseGlobal.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    modalBackdrop.addEventListener('click', closeAllModals);
});