/**
 * ======================================================
 * SCRIPT KHUSUS: owner/template.html
 * Meng-handle:
 * 1. Logika Tab Utama (Nota Cetak, Pesan Otomatis)
 * 2. Logika Modal Edit Nota (termasuk preview logo)
 * 3. Logika Modal Edit Pesan (termasuk copy variabel)
 * ======================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- FUNGSI HELPER MODAL (UMUM) ---
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
    
    document.querySelectorAll('.btn-close-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
        });
    });

    modalBackdrop.addEventListener('click', () => {
            document.querySelectorAll('.modal-popup').forEach(closeModal);
    });
    
    document.querySelectorAll('.btn-simpan').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            console.log('Menyimpan data...');
            const modalId = button.dataset.modalId;
            const modalToClose = document.getElementById(modalId);
            closeModal(modalToClose);
            
            if (modalId === 'modal-edit-nota') {
                updateNotaPreview();
            }
        });
    });

    // --- 1. LOGIKA TAB ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('[id^="tab-"]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.dataset.target;
            
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-button-active');
                btn.classList.add('tab-button');
            });
            button.classList.add('tab-button-active');
            button.classList.remove('tab-button');

            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });
            document.querySelector(targetPanelId).classList.remove('hidden');
        });
    });

    // --- 2. LOGIKA TAB 1: TEMPLATE NOTA ---
    const btnEditNota = document.getElementById('btn-edit-nota');
    const modalEditNota = document.getElementById('modal-edit-nota');
    
    const logoUpload = document.getElementById('logo_upload');
    const logoFormPreview = document.getElementById('logo-form-preview');
    const logoNotaPreview = document.getElementById('logo-preview');
    const headerInput = document.getElementById('nota_header');
    const footerInput = document.getElementById('nota_footer');
    const headerPreview = document.getElementById('header-preview');
    const footerPreview = document.getElementById('footer-preview');

    btnEditNota.addEventListener('click', () => {
        headerInput.value = headerPreview.innerText.replace('--------------------------------', '').trim();
        footerInput.value = footerPreview.innerText.trim();
        openModal(modalEditNota);
    });

    function updateNotaPreview() {
        headerPreview.innerText = headerInput.value + '\n--------------------------------';
        footerPreview.innerText = footerInput.value;
    }
    
    logoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgUrl = e.target.result;
                logoFormPreview.src = imgUrl; 
                logoNotaPreview.src = imgUrl; 
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 3. LOGIKA TAB 2: TEMPLATE PESAN ---
    const modalEditPesan = document.getElementById('modal-edit-pesan');
    const modalPesanTitle = document.getElementById('modal-pesan-title');
    const pesanTemplateInput = document.getElementById('pesan_template');
    const pesanTipeInput = document.getElementById('pesan_tipe');
    
    const templates = {
        'Pesanan Diterima': 'Hai [NAMA_PELANGGAN], pesanan Anda di [NAMA_OUTLET] dengan ID [ID_NOTA] telah kami terima. Total biaya: [TOTAL_HARGA]. Estimasi selesai: [ESTIMASI_SELESAI].',
        'Pesanan Diproses': 'Hai [NAMA_PELANGGAN], pesanan Anda [ID_NOTA] sedang kami proses cuci dan setrika.',
        'Pesanan Siap Diambil': 'Hai [NAMA_PELANGGAN], pesanan Anda [ID_NOTA] sudah selesai dan siap diambil. Total tagihan: [TOTAL_HARGA]. Terima kasih!',
        'Pesanan Selesai': 'Hai [NAMA_PELANGGAN], terima kasih telah menggunakan layanan [NAMA_OUTLET]. Kami tunggu kedatangan Anda selanjutnya!'
    };

    document.querySelectorAll('.btn-edit-pesan').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            
            modalPesanTitle.innerText = `Edit: ${title}`;
            pesanTipeInput.value = title;
            pesanTemplateInput.value = templates[title] || ''; 
            
            openModal(modalEditPesan);
        });
    });

    const toast = document.getElementById('toast-copied');
    document.querySelectorAll('.btn-variable').forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.innerText;
            
            try {
                const dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = textToCopy;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);

                toast.classList.remove('hidden');
                toast.classList.remove('opacity-0');
                setTimeout(() => {
                    toast.classList.add('opacity-0');
                    setTimeout(() => toast.classList.add('hidden'), 300);
                }, 1500);

            } catch (err) {
                console.error('Gagal menyalin teks: ', err);
            }
            
            const cursorPos = pesanTemplateInput.selectionStart;
            const text = pesanTemplateInput.value;
            pesanTemplateInput.value = text.substring(0, cursorPos) + textToCopy + text.substring(cursorPos);
            pesanTemplateInput.focus();
        });
    });
});