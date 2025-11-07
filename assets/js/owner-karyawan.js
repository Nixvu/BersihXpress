/**
 * ======================================================
 * SCRIPT KHUSUS: owner/karyawan.html
 * Meng-handle:
 * 1. Logika modal bertingkat (Opsi -> Info/Edit/Reset/Hapus)
 * 2. Logika modal Gaji
 * 3. Logika modal notifikasi Sukses (pengganti alert)
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // Tombol Pembuka
    const btnsBukaOpsi = document.querySelectorAll('.btn-buka-opsi');
    const btnTambahKaryawan = document.getElementById('btn-tambah-karyawan');

    // Modal Slide-up
    const modalOpsiKaryawan = document.getElementById('modal-opsi-karyawan');
    const modalEditKaryawan = document.getElementById('modal-edit-karyawan');
    const modalTambahKaryawan = document.getElementById('modal-tambah-karyawan');
    const modalResetPassword = document.getElementById('modal-reset-password');
    const modalInfoKaryawan = document.getElementById('modal-info-karyawan');

    // --- (BARU) Modal Proses Gaji ---
    const modalProsesGaji = document.getElementById('modal-proses-gaji');
    const btnBukaProsesGaji = document.getElementById('btn-buka-proses-gaji');

    // Modal Centered
    const modalHapusKaryawan = document.getElementById('modal-hapus-karyawan');

    // --- (BARU) Modal Notifikasi Sukses ---
    const modalSukses = document.getElementById('modal-sukses');
    const suksesTitle = document.getElementById('sukses-title');
    const suksesMessage = document.getElementById('sukses-message');
    const btnCloseSukses = document.querySelector('.btn-close-sukses');

    // Tombol Navigasi di dalam Opsi
    const btnInfoKinerja = document.getElementById('btn-info-kinerja');
    const btnEditKaryawan = document.getElementById('btn-edit-karyawan');
    const btnResetPassword = document.getElementById('btn-reset-password');
    const btnHapusKaryawan = document.getElementById('btn-hapus-karyawan');

    // Tombol Aksi / Tutup
    const btnsCloseModal = document.querySelectorAll('.btn-close-modal');
    const btnsCloseCentered = document.querySelectorAll('.btn-close-centered');
    const btnsSimpan = document.querySelectorAll('.btn-simpan');
    const btnHapusConfirm = document.querySelector('.btn-hapus-confirm');

    let currentKaryawanNama = '';

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

    // --- (BARU) Fungsi Notifikasi Sukses ---
    function showSuccessModal(title, message) {
        suksesTitle.innerText = title;
        suksesMessage.innerText = message;

        openModalCentered(modalSukses); // Gunakan fungsi yg sudah ada

        // Penting: Render ikon check `✓`
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }


    // --- PASANG EVENT LISTENERS ---
    btnsBukaOpsi.forEach(btn => {
        btn.addEventListener('click', () => {
            currentKaryawanNama = btn.dataset.nama || 'Opsi Karyawan';
            document.getElementById('opsi-nama-karyawan').innerText = currentKaryawanNama;
            openModal(modalOpsiKaryawan);
        });
    });

    btnTambahKaryawan.addEventListener('click', () => {
        openModal(modalTambahKaryawan);
    });

    btnInfoKinerja.addEventListener('click', () => {
        document.getElementById('info-nama-karyawan').innerText = currentKaryawanNama;
        closeModal(modalOpsiKaryawan);
        openModal(modalInfoKaryawan);
    });

    btnEditKaryawan.addEventListener('click', () => {
        closeModal(modalOpsiKaryawan);
        openModal(modalEditKaryawan);
    });

    btnResetPassword.addEventListener('click', () => {
        document.getElementById('reset-password-info').innerText = `Anda akan mengatur ulang password untuk karyawan: ${currentKaryawanNama}`;
        closeModal(modalOpsiKaryawan);
        openModal(modalResetPassword);
    });

    btnHapusKaryawan.addEventListener('click', () => {
        closeModal(modalOpsiKaryawan);
        openModalCentered(modalHapusKaryawan);
    });

    // --- (BARU) Listener Tombol Gaji ---
    btnBukaProsesGaji.addEventListener('click', () => {
        document.getElementById('gaji-nama-karyawan').innerText = currentKaryawanNama;

        // TODO: Isi data kinerja
        // document.getElementById('gaji_kinerja_total').value = ...;

        closeModal(modalInfoKaryawan);
        openModal(modalProsesGaji);
    });

    // --- (MODIFIKASI) Logika Tombol Tutup ---
    btnsCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);

            if (modalId === 'modal-edit-karyawan' || modalId === 'modal-reset-password' || modalId === 'modal-info-karyawan') {
                // Jika dari Edit, Reset, atau Info -> kembali ke Opsi
                closeModal(modalToClose);
                openModal(modalOpsiKaryawan);
            }
            else if (modalId === 'modal-proses-gaji') {
                // Jika dari Proses Gaji -> kembali ke Info Karyawan
                closeModal(modalToClose);
                openModal(modalInfoKaryawan);
            }
            else {
                // Jika tidak (misal: Opsi, Tambah) -> tutup semua
                closeAllModals();
            }
        });
    });

    btnsSimpan.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menyimpan data...');
            closeAllModals();
            // Tampilkan notifikasi sukses setelah simpan
            showSuccessModal('Data Disimpan', 'Perubahan telah berhasil disimpan.');
        });
    });

    btnsCloseCentered.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModalCentered(modalToClose);
            openModal(modalOpsiKaryawan);
        });
    });

    // --- (BARU) Listener Tombol Tutup Modal Sukses ---
    btnCloseSukses.addEventListener('click', () => {
        closeModalCentered(modalSukses);
    });

    btnHapusConfirm.addEventListener('click', () => {
        console.log('Menghapus data karyawan...');
        closeAllModals();
        showSuccessModal('Data Dihapus', 'Karyawan telah berhasil dihapus.');
    });

    modalBackdrop.addEventListener('click', closeAllModals);

    // --- (MODIFIKASI) LOGIKA FORM PROSES GAJI ---
    const formProsesGaji = document.getElementById('form-proses-gaji');
    const gajiKinerjaTotal = document.getElementById('gaji_kinerja_total');
    const gajiTarifPerUnit = document.getElementById('gaji_tarif_per_unit');
    const gajiBonus = document.getElementById('gaji_bonus');
    const gajiPotongan = document.getElementById('gaji_potongan');
    const gajiPokokDisplay = document.getElementById('gaji_pokok_otomatis');
    const gajiTotalDisplay = document.getElementById('gaji_total_dibayar');

    function hitungTotalGaji() {
        const kinerja = parseFloat(gajiKinerjaTotal.value) || 0;
        const tarif = parseFloat(gajiTarifPerUnit.value) || 0;
        const bonus = parseFloat(gajiBonus.value) || 0;
        const potongan = parseFloat(gajiPotongan.value) || 0;

        const gajiPokok = kinerja * tarif;
        const totalGaji = gajiPokok + bonus - potongan;

        gajiPokokDisplay.value = `Rp ${gajiPokok.toLocaleString('id-ID')}`;
        gajiTotalDisplay.innerText = `Rp ${totalGaji.toLocaleString('id-ID')}`;
    }

    gajiKinerjaTotal.addEventListener('input', hitungTotalGaji);
    gajiTarifPerUnit.addEventListener('input', hitungTotalGaji);
    gajiBonus.addEventListener('input', hitungTotalGaji);
    gajiPotongan.addEventListener('input', hitungTotalGaji);

    formProsesGaji.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    console.log('Menyimpan data Gaji untuk:', currentKaryawanNama);
    closeModal(modalProsesGaji); 
    showSuccessModal('Gaji Diproses', 'Pembayaran gaji berhasil dicatat sebagai pengeluaran.');
});
});