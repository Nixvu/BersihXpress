/**
 * ======================================================
 * SCRIPT KHUSUS: karyawan/index.html
 * Meng-handle:
 * 1. Logika modal Aksi Cepat (Transaksi, Absensi)
 * 2. Logika modal bertingkat "Buat Transaksi"
 * 3. Logika Tab & Jam Real-time untuk modal "Absensi"
 * 4. Notifikasi Toast
 * 5. PERUBAHAN: Logika Tab "Tugas Saya"
 * 6. PERUBAHAN: Logika Filter di Modal Absensi
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {

    // (Komentar) --- PILIH ELEMEN MODAL ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // (Komentar) Tombol Aksi Cepat
    const btnOpenTransaksi = document.getElementById('btn-open-transaksi');
    const btnOpenAbsensi = document.getElementById('btn-open-absensi');

    // (Komentar) Modal Utama
    const modalBuatTransaksi = document.getElementById('modal-buat-transaksi');
    const modalAbsensi = document.getElementById('modal-absensi');

    // (Komentar) Modal Bertingkat (Transaksi) - SAMA SEPERTI OWNER
    const modalRincianTransaksi = document.getElementById('modal-rincian-transaksi');
    const modalTransaksiTemplate = document.getElementById('modal-transaksi-template');
    const btnTransaksiManual = document.getElementById('btn-transaksi-manual');
    const btnTransaksiTemplate = document.getElementById('btn-transaksi-template');

    // (Komentar) Tombol Penutup Global
    const closeButtons = document.querySelectorAll('.btn-close-global');
    const saveButtons = document.querySelectorAll('.btn-simpan-global');

    // (Komentar) --- FUNGSI-FUNGSI HELPER MODAL ---
    let clockInterval;

    function openModal(modalElement) {
        if (!modalElement) return;
        modalContainer.classList.remove('hidden');
        modalBackdrop.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';
        modalElement.classList.remove('hidden');
        requestAnimationFrame(() => modalElement.style.transform = 'translateY(0)');

        if (modalElement.id === 'modal-absensi') {
            startLiveClock();
            feather.replace(); // (Komentar) Muat ikon di dalam modal
        }
    }

    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.transform = 'translateY(100%)';
        setTimeout(() => modalElement.classList.add('hidden'), 300);

        if (modalElement.id === 'modal-absensi') {
            stopLiveClock();
        }
    }

    function closeAllModals() {
        const allModals = [
            modalBuatTransaksi, modalRincianTransaksi, modalTransaksiTemplate,
            modalAbsensi
        ];
        allModals.forEach(closeModal);
        modalBackdrop.classList.add('opacity-0');
        setTimeout(() => {
            modalContainer.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // (Komentar) --- LOGIKA TOAST (Notifikasi) ---
    const toastNotif = document.getElementById('toast-notifikasi');
    function showToast(message) {
        toastNotif.innerText = message;
        toastNotif.classList.remove('hidden');
        toastNotif.classList.remove('opacity-0');
        setTimeout(() => {
            toastNotif.classList.add('opacity-0');
            setTimeout(() => toastNotif.classList.add('hidden'), 300);
        }, 2000); // Tampilkan selama 2 detik
    }

    // (Komentar) --- PASANG EVENT LISTENERS (MODAL) ---

    btnOpenTransaksi.addEventListener('click', () => openModal(modalBuatTransaksi));
    btnOpenAbsensi.addEventListener('click', () => openModal(modalAbsensi));

    // (Komentar) Listener Alur Transaksi (SAMA SEPERTI OWNER)
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

    saveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menyimpan data transaksi...');
            closeAllModals();
            showToast('Transaksi berhasil dibuat!');
        });
    });

    // (Komentar) --- LOGIKA KHUSUS MODAL ABSENSI (IMPROVEMENT) ---

    // (Komentar) Logika Tab (Presensi & Informasi)
    const absenTabButtons = document.querySelectorAll('.absen-tab-button');
    const absenTabPanels = document.querySelectorAll('.absen-tab-panel');

    absenTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.target;
            absenTabButtons.forEach(btn => {
                btn.classList.remove('tab-button-active');
                btn.classList.add('tab-button');
            });
            button.classList.add('tab-button-active');
            button.classList.remove('tab-button');

            absenTabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });
            document.querySelector(targetPanelId).classList.remove('hidden');
        });
    });

    // (Komentar) Logika Filter di Tab Informasi (BARU)
    const absenFilterButtons = document.querySelectorAll('.absen-filter-button');
    absenFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            // (Komentar) Setel ulang semua tombol filter
            absenFilterButtons.forEach(btn => {
                btn.classList.remove('aksi-tab-button-active');
                btn.classList.add('text-gray-600');
            });
            // (Komentar) Aktifkan tombol yang diklik
            button.classList.add('aksi-tab-button-active');
            button.classList.remove('text-gray-600');

            console.log(`Memfilter data absensi: ${filter}`);
            // (Komentar) TODO: Tambahkan logika untuk memuat ulang data aktivitas absensi
            // berdasarkan 'filter' (minggu/bulan)
        });
    });


    // (Komentar) Logika Jam Real-time
    const clockElement = document.getElementById('live-clock');
    const dateElement = document.getElementById('live-date');
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function updateClock() {
        const now = new Date();
        clockElement.innerText = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        dateElement.innerText = now.toLocaleDateString('id-ID', optionsDate);
    }
    function startLiveClock() {
        if (clockInterval) clearInterval(clockInterval);
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
    }
    function stopLiveClock() {
        clearInterval(clockInterval);
    }

    // (Komentar) Logika Tombol Absen
    document.getElementById('btn-absen-masuk').addEventListener('click', () => {
        console.log('Absen MASUK dicatat');
        closeModal(modalAbsensi);
        showToast('Absen Masuk berhasil dicatat!');
    });

    document.getElementById('btn-absen-pulang').addEventListener('click', () => {
        console.log('Absen PULANG dicatat');
        closeModal(modalAbsensi);
        showToast('Absen Pulang berhasil dicatat!');
    });


    // (Komentar) --- LOGIKA TAB "TUGAS SAYA" (BARU) ---
    const tugasTabButtons = document.querySelectorAll('.tugas-tab-button');
    const tugasTabPanels = document.querySelectorAll('.tugas-tab-panel');

    tugasTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.target;

            tugasTabButtons.forEach(btn => {
                btn.classList.remove('aksi-tab-button-active');
                btn.classList.add('text-gray-600');
            });
            button.classList.add('aksi-tab-button-active');
            button.classList.remove('text-gray-600');

            tugasTabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            if (document.querySelector(targetPanelId)) {
                document.querySelector(targetPanelId).classList.remove('hidden');
            }
        });
    });
});

