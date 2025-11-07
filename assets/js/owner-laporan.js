/**
 * ======================================================
 * SCRIPT KHUSUS: owner/laporan.html
 * Meng-handle:
 * 1. Logika Tab Utama (Pendapatan, Pengeluaran, etc.)
 * 2. Logika Modal "Ekspor Laporan"
 * 3. Logika Modal "Filter Waktu"
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIKA UNTUK TAB ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('[id^="tab-"]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.target;
            tabButtons.forEach(btn => btn.classList.remove('tab-button-active'));
            button.classList.add('tab-button-active');
            tabPanels.forEach(panel => panel.classList.add('hidden'));
            if (document.querySelector(targetPanelId)) {
                document.querySelector(targetPanelId).classList.remove('hidden');
            }
        });
    });

    // --- LOGIKA MODAL (UMUM) ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

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
            const anyModalOpen = document.querySelectorAll('.modal-popup:not(.hidden)').length === 0;
            if (anyModalOpen) {
                modalBackdrop.classList.add('opacity-0');
                setTimeout(() => {
                    modalContainer.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }, 300);
    }

    // Tombol close modal generik
    document.querySelectorAll('.btn-close-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.currentTarget.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
        });
    });

    modalBackdrop.addEventListener('click', () => {
        document.querySelectorAll('.modal-popup:not(.hidden)').forEach(closeModal);
    });

    // Tombol simpan generik (hanya menutup modal)
    document.querySelectorAll('.btn-simpan').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = e.currentTarget.dataset.modalId;
            const modalToClose = document.getElementById(modalId);

            if (modalId === 'modal-filter-tanggal') {
                const tglMulai = document.getElementById('filter_tanggal_mulai').value;
                const tglSelesai = document.getElementById('filter_tanggal_selesai').value;
                if (tglMulai && tglSelesai) {
                    document.getElementById('active-filter-display').innerText = `Filter: ${tglMulai} - ${tglSelesai}`;
                }
                console.log('Menerapkan filter kustom...');
            }

            if (modalId === 'modal-export') {
                console.log('Memulai ekspor...');
            }
            closeModal(modalToClose);
        });
    });

    // --- LOGIKA MODAL EXPORT ---
    const btnExport = document.getElementById('btn-export');
    const modalExport = document.getElementById('modal-export');
    btnExport.addEventListener('click', () => {
        openModal(modalExport);
    });

    // --- LOGIKA MODAL FILTER TANGGAL ---
    const btnFilterTanggal = document.getElementById('btn-filter-tanggal');
    const modalFilterTanggal = document.getElementById('modal-filter-tanggal');
    const activeFilterDisplay = document.getElementById('active-filter-display');

    btnFilterTanggal.addEventListener('click', () => {
        openModal(modalFilterTanggal);
    });

    document.querySelectorAll('.btn-quick-filter').forEach(button => {
        button.addEventListener('click', (e) => {
            const filterText = e.currentTarget.dataset.filterText;
            activeFilterDisplay.innerText = filterText;
            document.querySelectorAll('.btn-quick-filter').forEach(btn => {
                btn.classList.remove('bg-blue-100', 'text-blue-700', 'font-bold');
                btn.classList.add('bg-gray-100', 'text-gray-700', 'font-medium');
            });
            e.currentTarget.classList.add('bg-blue-100', 'text-blue-700', 'font-bold');
            e.currentTarget.classList.remove('bg-gray-100', 'text-gray-700', 'font-medium');
            document.getElementById('filter_tanggal_mulai').value = '';
            document.getElementById('filter_tanggal_selesai').value = '';
            console.log('Filter diubah ke:', filterText);
            closeModal(modalFilterTanggal);
        });
    });
});