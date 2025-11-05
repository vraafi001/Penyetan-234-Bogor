// script.js

document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.order-button');
    const waNumber = '628116173651'; // Nomor WhatsApp

    // Event listener untuk semua tombol "Pesan Sekarang (Klik!)"
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuCard = e.target.closest('.menu-card');
            const menuName = menuCard.querySelector('h3').textContent.trim();
            const waLink = e.target.getAttribute('href');

            // Cek apakah menu memerlukan pilihan Goreng/Bakar
            if (menuName.includes('Goreng / Bakar')) {
                // Untuk menu yang memerlukan pilihan, kita akan membuat pesan WhatsApp yang meminta varian
                const baseMenuName = menuName.replace(' Goreng / Bakar', '');
                const message = `Halo, saya mau pesan paket ${baseMenuName}. Mohon infokan varian (Goreng/Bakar) yang tersedia.`;
                const encodedMessage = encodeURIComponent(message);
                const waLinkWithQuery = `https://wa.me/${waNumber}?text=${encodedMessage}`;
                window.open(waLinkWithQuery, '_blank');
            } else {
                // Untuk menu yang tidak memerlukan pilihan (Ayam Goreng, Ayam Bakar)
                // Kita akan menggunakan href yang sudah ada (yang seharusnya sudah berisi link WA)
                // Jika href kosong, kita buat pesan default
                if (waLink && waLink !== '#') {
                    window.open(waLink, '_blank');
                } else {
                    const message = `Halo, saya mau pesan paket ${menuName}.`;
                    const encodedMessage = encodeURIComponent(message);
                    const waLinkWithQuery = `https://wa.me/${waNumber}?text=${encodedMessage}`;
                    window.open(waLinkWithQuery, '_blank');
                }
            }
        });
    });
});
