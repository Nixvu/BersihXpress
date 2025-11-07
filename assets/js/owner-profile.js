/**
 * ======================================================
 * SCRIPT KHUSUS: owner/profile.html
 * Meng-handle:
 * 1. Logika modal Edit Profil, Ubah Pass, Keluar
 * 2. Logika Toggle Notifikasi & Toast
 * 3. Logika update preview foto & data
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- PILIH ELEMEN ---
    const modalContainer = document.getElementById('modal-container');
    const modalBackdrop = document.getElementById('modal-backdrop');

    // Triggers
    const btnEditProfil = document.getElementById('btn-edit-profil');
    const btnUbahPassword = document.getElementById('btn-ubah-password');
    const btnKeluarAkun = document.getElementById('btn-keluar-akun');
    const toggleNotif = document.getElementById('toggleNotif');

    // Modals
    const modalEditProfil = document.getElementById('modal-edit-profil');
    const modalUbahPassword = document.getElementById('modal-ubah-password');
    const modalKeluarAkun = document.getElementById('modal-keluar-akun');
    const toastNotif = document.getElementById('toast-notifikasi');

    // Tombol Aksi
    const btnsCloseModal = document.querySelectorAll('.btn-close-modal');
    const btnsCloseCentered = document.querySelectorAll('.btn-close-centered');
    const btnsSimpan = document.querySelectorAll('.btn-simpan');
    const btnKeluarConfirm = document.querySelector('.btn-keluar-confirm');
    
    // Elemen Form Profil
    const profilNamaInput = document.getElementById('profil_nama');
    const profilEmailInput = document.getElementById('profil_email');
    const profilUpload = document.getElementById('profil_upload');
    
    // Elemen Display Profil
    const profilNamaMain = document.getElementById('profil-nama-main');
    const profilEmailMain = document.getElementById('profil-email-main');
    const profilAvatarMain = document.getElementById('profil-avatar-main');
    const profilAvatarForm = document.getElementById('profil-avatar-form');

    // --- FUNGSI HELPER MODAL ---
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
            const anyCenteredModalOpen = document.querySelectorAll('.modal-centered:not(.hidden)').length === 0;

            if (anyModalOpen && anyCenteredModalOpen) {
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
    
    function showToast(message) {
        toastNotif.innerText = message;
        toastNotif.classList.remove('hidden');
        toastNotif.classList.remove('opacity-0');
        setTimeout(() => {
            toastNotif.classList.add('opacity-0');
            setTimeout(() => toastNotif.classList.add('hidden'), 300);
        }, 2000); // Tampilkan selama 2 detik
    }

    // --- PASANG EVENT LISTENERS ---
    btnEditProfil.addEventListener('click', () => {
        profilNamaInput.value = profilNamaMain.innerText.trim();
        profilEmailInput.value = profilEmailMain.innerText.trim();
        openModal(modalEditProfil);
    });
    
    profilUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgUrl = e.target.result;
                profilAvatarForm.src = imgUrl; 
                profilAvatarMain.src = imgUrl; 
            };
            reader.readAsDataURL(file);
        }
    });

    btnUbahPassword.addEventListener('click', () => {
        openModal(modalUbahPassword);
    });

    toggleNotif.addEventListener('change', (e) => {
        if (e.target.checked) {
            console.log('Notifikasi Diaktifkan');
            showToast('Notifikasi diaktifkan!');
        } else {
            console.log('Notifikasi Dimatikan');
            showToast('Notifikasi dimatikan.');
        }
    });

    btnKeluarAkun.addEventListener('click', () => {
        openModalCentered(modalKeluarAkun);
    });
    
    btnsCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
        });
    });

    btnsCloseCentered.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModalCentered(modalToClose);
        });
    });

    btnsSimpan.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.dataset.modalId;
            
            if (modalId === 'modal-edit-profil') {
                profilNamaMain.childNodes[0].nodeValue = profilNamaInput.value.trim() + ' ';
                profilEmailMain.innerText = profilEmailInput.value.trim();
                console.log('Profil disimpan!');
            }
            
            if (modalId === 'modal-ubah-password') {
                console.log('Password disimpan!');
            }
            
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
            showToast('Perubahan berhasil disimpan!');
        });
    });

    btnKeluarConfirm.addEventListener('click', () => {
        console.log('Aksi Keluar Akun...');
        closeAllModals();
        showToast('Anda telah keluar.');
        // (Komentar) TODO: Arahkan ke halaman login
        // window.location.href = '../auth/masuk.html';
    });

    modalBackdrop.addEventListener('click', closeAllModals);
});