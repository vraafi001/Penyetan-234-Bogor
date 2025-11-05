// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil semua elemen yang dibutuhkan
    const modal = document.getElementById('choiceModal');
    const closeButton = document.querySelector('.close-button');
    const orderButtons = document.querySelectorAll('.order-button');
    const menuTitleElement = document.getElementById('menuTitle');
    const choiceGorengButton = document.getElementById('choiceGoreng');
    const choiceBakarButton = document.getElementById('choiceBakar');
    const waNumber = '628116173651'; // Nomor WhatsApp

    let currentMenuName = '';

    // 2. Fungsi untuk menampilkan modal
    const showModal = (menuName) => {
        currentMenuName = menuName;
        menuTitleElement.textContent = `Pilih Varian untuk ${menuName}`;
        // Perbaikan: Gunakan class 'active' untuk menampilkan/menyembunyikan modal
        // Pastikan CSS untuk '.modal' memiliki 'display: none;' dan '.modal.active' memiliki 'display: block;'
        modal.classList.add('active');
    };

    // 3. Fungsi untuk menyembunyikan modal
    const hideModal = () => {
        modal.classList.remove('active');
        currentMenuName = '';
    };

    // 4. Event listener untuk semua tombol "Pesan Sekarang (Klik!)"
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuCard = e.target.closest('.menu-card');
            const menuName = menuCard.querySelector('h3').textContent.trim();
            const waLink = e.target.getAttribute('href');

            console.log(`Tombol diklik untuk: ${menuName}`);

            // Cek apakah menu memerlukan pilihan Goreng/Bakar
            if (menuName.includes('Goreng / Bakar')) {
                console.log('Menu bervarian, menampilkan modal.');
                // Tampilkan modal untuk memilih varian
                showModal(menuName.replace(' Goreng / Bakar', ''));
            } else {
                console.log('Menu tidak bervarian, langsung ke WhatsApp.');
                // Untuk menu yang tidak memerlukan pilihan (Ayam Goreng, Ayam Bakar)
                // Langsung buka link WhatsApp
                const message = `Halo, saya mau pesan paket ${menuName}.`;
                const encodedMessage = encodeURIComponent(message);
                const waLinkWithQuery = `https://wa.me/${waNumber}?text=${encodedMessage}`;
                window.open(waLinkWithQuery, '_blank');
            }
        });
    });

    // 5. Event listener untuk tombol pilihan "Goreng"
    choiceGorengButton.addEventListener('click', () => {
        const message = `Halo, saya mau pesan paket ${currentMenuName} Goreng.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
        hideModal();
    });

    // 6. Event listener untuk tombol pilihan "Bakar"
    choiceBakarButton.addEventListener('click', () => {
        const message = `Halo, saya mau pesan paket ${currentMenuName} Bakar.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
        hideModal();
    });

    // 7. Event listener untuk tombol tutup modal
    closeButton.addEventListener('click', hideModal);

    // 8. Event listener untuk menutup modal ketika mengklik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});
