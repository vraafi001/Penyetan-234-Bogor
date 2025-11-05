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

    // Fungsi untuk menampilkan modal (Hanya digunakan untuk desktop)
    const showModal = (menuName) => {
        currentMenuName = menuName;
        menuTitleElement.textContent = `Pilih Varian untuk ${menuName}`;
        modal.style.display = 'block';
    };

    // Fungsi untuk membuat dan menampilkan tombol varian di dalam card
    const createVariantButtons = (menuCard) => {
        const placeholder = menuCard.querySelector('.variant-choice-placeholder');
        if (!placeholder) return;

        // Hapus tombol yang mungkin sudah ada
        placeholder.innerHTML = '';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('modal-buttons');

        const menuName = menuCard.querySelector('h3').textContent.trim().replace(' Goreng / Bakar', '');

        const createButton = (variant) => {
            const button = document.createElement('button');
            button.textContent = variant;
            button.classList.add('modal-button', 'choice-button', variant.toLowerCase());
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah event click menyebar ke order-button
                const message = \`Halo, saya mau pesan paket \${menuName} \${variant}.\`;
                const encodedMessage = encodeURIComponent(message);
                const waLink = \`https://wa.me/\${waNumber}?text=\${encodedMessage}\`;
                window.open(waLink, '_blank');
            });
            return button;
        };

        buttonsContainer.appendChild(createButton('Goreng'));
        buttonsContainer.appendChild(createButton('Bakar'));
        placeholder.appendChild(buttonsContainer);
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
                // Logika untuk menampilkan tombol varian di dalam card (mobile) atau modal (desktop)
                if (window.innerWidth <= 599) {
                    const placeholder = menuCard.querySelector('.variant-choice-placeholder');
                    
                    // Jika placeholder sudah menampilkan tombol, sembunyikan
                    if (placeholder.style.display === 'block') {
                        placeholder.style.display = 'none';
                    } else {
                        // Sembunyikan semua placeholder lain
                        document.querySelectorAll('.variant-choice-placeholder').forEach(p => {
                            if (p !== placeholder) {
                                p.style.display = 'none';
                            }
                        });
                        
                        // Tampilkan tombol varian di card ini
                        createVariantButtons(menuCard);
                        placeholder.style.display = 'block';
                    }
                } else {
                    // Untuk desktop, tetap gunakan modal
                    showModal(menuName.replace(' Goreng / Bakar', ''));
                }
            } else {
                // Untuk menu yang tidak memerlukan pilihan (Ayam Goreng, Ayam Bakar)
                window.open(waLink, '_blank');
            }
        });
    });

    // Event listener untuk tombol pilihan "Goreng" (Hanya untuk Modal Desktop)
    choiceGorengButton.addEventListener('click', () => {
        const message = `Halo, saya mau pesan paket ${currentMenuName} Goreng.`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLink, '_blank');
        hideModal();
    });

    // Event listener untuk tombol pilihan "Bakar" (Hanya untuk Modal Desktop)
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
