// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil semua elemen yang dibutuhkan
    const modal = document.getElementById('choiceModal');
    const closeButton = document.querySelector('.close-button');
    const menuTitleElement = document.getElementById('menuTitle');
    const choiceGorengButton = document.getElementById('choiceGoreng');
    const choiceBakarButton = document.getElementById('choiceBakar');
    const waNumber = '628116173651'; // Nomor WhatsApp

    let currentMenuName = '';
    let currentMenuPrice = 0;

    // Fungsi untuk membuat link WhatsApp
    const createWhatsAppLink = (menuName, price, variant = '') => {
        const finalMenuName = variant ? `${menuName} ${variant}` : menuName;
        const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
        
        const message = `Halo, saya mau pesan 1x ${finalMenuName} (${formattedPrice}). Mohon diproses ya, terima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${waNumber}?text=${encodedMessage}`;
    };

    // 2. Fungsi untuk menampilkan modal
    const showModal = (menuName, price) => {
        currentMenuName = menuName;
        currentMenuPrice = price;
        menuTitleElement.textContent = `Pilih Varian untuk ${menuName}`;
        modal.classList.add('active');
    };

    // 3. Fungsi untuk menyembunyikan modal
    const hideModal = () => {
        modal.classList.remove('active');
        currentMenuName = '';
        currentMenuPrice = 0;
    };

    // 4. Event listener untuk semua tombol "Pesan Sekarang Klik!"
    document.querySelectorAll('.variant-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuName = e.target.getAttribute('data-menu-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            const hasVariant = e.target.getAttribute('data-has-variant') === 'true';

            if (hasVariant) {
                // Tampilkan modal untuk menu yang memiliki varian (Bebek, Ikan, dll)
                showModal(menuName, price);
            } else {
                // Langsung ke WhatsApp untuk menu tanpa varian (Ayam Goreng, Ayam Bakar)
                const waLink = createWhatsAppLink(menuName, price);
                window.open(waLink, '_blank');
            }
        });
    });

    // 6. Event listener untuk tombol pilihan "Goreng"
    choiceGorengButton.addEventListener('click', () => {
        const waLink = createWhatsAppLink(currentMenuName, currentMenuPrice, 'Goreng');
        window.open(waLink, '_blank');
        hideModal();
    });

    // 7. Event listener untuk tombol pilihan "Bakar"
    choiceBakarButton.addEventListener('click', () => {
        const waLink = createWhatsAppLink(currentMenuName, currentMenuPrice, 'Bakar');
        window.open(waLink, '_blank');
        hideModal();
    });

    // 8. Event listener untuk tombol tutup modal varian
    closeButton.addEventListener('click', hideModal);

    // 9. Event listener untuk menutup modal varian ketika mengklik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});
