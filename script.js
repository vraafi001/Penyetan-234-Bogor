// script.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('choiceModal');
    const closeButton = document.querySelector('.close-button');
    const orderButtons = document.querySelectorAll('.order-button');
    const menuTitleElement = document.getElementById('menuTitle');
    const choiceGorengButton = document.getElementById('choiceGoreng');
    const choiceBakarButton = document.getElementById('choiceBakar');
    const waNumber = '628116173651'; // Nomor WhatsApp

    let currentMenuName = '';

    // Fungsi untuk menampilkan modal
    const showModal = (menuName) => {
        currentMenuName = menuName;
        menuTitleElement.textContent = `Pilih Varian untuk ${menuName}`;
        modal.style.display = 'block';
    };

    // Fungsi untuk menyembunyikan modal
    const hideModal = () => {
        modal.style.display = 'none';
        currentMenuName = '';
    };

    // Event listener untuk semua tombol "Pesan Sekarang (Klik!)"
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuCard = e.target.closest('.menu-card');
            const menuName = menuCard.querySelector('h3').textContent.trim();
            const waLink = e.target.getAttribute('href');

            // Cek apakah menu memerlukan pilihan Goreng/Bakar
            if (menuName.includes('Goreng / Bakar')) {
                showModal(menuName.replace(' Goreng / Bakar', ''));
            } else {
                // Untuk menu yang tidak memerlukan pilihan (Ayam Goreng, Ayam Bakar)
                window.open(waLink, '_blank');
            }
        });
    });

    // Event listener untuk tombol pilihan "Goreng"
    choiceGorengButton.addEventListener('click', () => {
        const message = `Halo, saya mau pesan paket ${currentMenuName} Goreng.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
        hideModal();
    });

    // Event listener untuk tombol pilihan "Bakar"
    choiceBakarButton.addEventListener('click', () => {
        const message = `Halo, saya mau pesan paket ${currentMenuName} Bakar.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
        hideModal();
    });

    // Event listener untuk tombol tutup modal
    closeButton.addEventListener('click', hideModal);

    // Event listener untuk menutup modal ketika mengklik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});
