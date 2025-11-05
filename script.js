// script.js

document.addEventListener('DOMContentLoaded', () => {
    const waNumber = '628116173651'; // Nomor WhatsApp

    // Fungsi untuk membuat link WhatsApp
    const createWhatsAppLink = (menuName, price, variant = '') => {
        const finalMenuName = variant ? `${menuName} ${variant}` : menuName;
        const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
        
        const message = `Halo, saya mau pesan 1x ${finalMenuName} (${formattedPrice}). Mohon diproses ya, terima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${waNumber}?text=${encodedMessage}`;
    };

    // Event listener untuk semua tombol "Pesan Sekarang Klik!"
    document.querySelectorAll('.variant-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuName = e.target.getAttribute('data-menu-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            const hasVariant = e.target.getAttribute('data-has-variant') === 'true';
            
            // Karena modal sudah dihapus, kita akan langsung mengarahkan ke WhatsApp
            // dengan asumsi varian default adalah "Goreng" jika memiliki varian,
            // atau meminta pengguna untuk memilih di WhatsApp.
            // Untuk amannya, kita akan mengarahkan ke WhatsApp dengan nama menu saja.
            
            let finalMenuName = menuName;
            if (hasVariant) {
                finalMenuName = `${menuName} (Mohon sebutkan varian Goreng/Bakar)`;
            }

            const waLink = createWhatsAppLink(finalMenuName, price);
            window.open(waLink, '_blank');
        });
    });
});
