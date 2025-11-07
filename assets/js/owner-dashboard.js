/**
 * ======================================================
 * SCRIPT KHUSUS: owner/dashboard.html
 * Meng-handle:
 * 1. Logika modal Aksi Cepat
 * 2. Logika Tab "Ringkasan Transaksi"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN MODAL ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // Tombol Aksi Cepat
    const btnOpenTransaksi = document.getElementById('btn-open-transaksi');
    const btnOpenPengeluaran = document.getElementById('btn-open-pengeluaran'); 
    const btnOpenPelanggan = document.getElementById('btn-open-pelanggan'); 

    // Modal Utama
    const modalBuatTransaksi = document.getElementById('modal-buat-transaksi');
    const modalPengeluaran = document.getElementById('modal-pengeluaran'); 
    const modalTambahPelanggan = document.getElementById('modal-tambah-pelanggan'); 

    // Modal Bertingkat (Transaksi)
    const modalRincianTransaksi = document.getElementById('modal-rincian-transaksi');
    const modalTransaksiTemplate = document.getElementById('modal-transaksi-template');
    const btnTransaksiManual = document.getElementById('btn-transaksi-manual');
    const btnTransaksiTemplate = document.getElementById('btn-transaksi-template');

    const closeButtons = document.querySelectorAll('.btn-close-global');

    // --- FUNGSI-FUNGSI HELPER MODAL ---
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
        setTimeout(() => modalElement.classList.add('hidden'), 300);
    }

    function closeAllModals() {
        const allModals = [
            modalBuatTransaksi, modalRincianTransaksi, modalTransaksiTemplate,
            modalPengeluaran, modalTambahPelanggan
        ];
        allModals.forEach(closeModal);
        modalBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // --- PASANG EVENT LISTENERS (MODAL) ---
    btnOpenTransaksi.addEventListener('click', () => openModal(modalBuatTransaksi));
    btnOpenPengeluaran.addEventListener('click', () => openModal(modalPengeluaran));
    btnOpenPelanggan.addEventListener('click', () => openModal(modalTambahPelanggan));

    btnTransaksiManual.addEventListener('click', () => {
        closeModal(modalBuatTransaksi);
        openModal(modalRincianTransaksi);
    });
    btnTransaksiTemplate.addEventListener('click', () => {
        closeModal(modalBuatTransaksi);
        openModal(modalTransaksiTemplate);
    });

    closeButtons.forEach(button => button.addEventListener('click', closeAllModals));
    modalBackdrop.addEventListener('click', closeAllModals);

    // --- LOGIKA TAB (KARTU RINGKASAN AKSI) ---
    const aksiTabButtons = document.querySelectorAll('.aksi-tab-button');
    const aksiTabPanels = document.querySelectorAll('.aksi-tab-panel');

    aksiTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.target;

            aksiTabButtons.forEach(btn => {
                btn.classList.remove('aksi-tab-button-active');
            });
            button.classList.add('aksi-tab-button-active');

            aksiTabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            if (document.querySelector(targetPanelId)) {
                document.querySelector(targetPanelId).classList.remove('hidden');
            }
        });
    });
});