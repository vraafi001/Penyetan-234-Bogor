// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil semua elemen yang dibutuhkan
    const modal = document.getElementById('choiceModal');
    const closeButton = document.querySelector('.close-button');
    const orderButtons = document.querySelectorAll('.order-button');
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const cartCloseButton = document.querySelector('.cart-close-button');
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');
    const clearCartButton = document.getElementById('clearCartButton');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentMenuPrice = 0;
    const menuTitleElement = document.getElementById('menuTitle');
    const choiceGorengButton = document.getElementById('choiceGoreng');
    const choiceBakarButton = document.getElementById('choiceBakar');
    const waNumber = '628116173651'; // Nomor WhatsApp

    let currentMenuName = '';
    let currentMenuPrice = 0;

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

    // Fungsi untuk mengupdate tampilan keranjang
    const updateCartDisplay = () => {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Keranjang Anda kosong.</li>';
            cartTotalElement.textContent = 'Rp 0';
            checkoutButton.disabled = true;
            return;
        }

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            listItem.innerHTML = `
                ${item.quantity}x ${item.name} (${formatRupiah(item.price)}) - **${formatRupiah(itemTotal)}**
                <button class="remove-item" data-index="${index}" style="background: none; color: #d9534f; border: none; font-size: 0.9rem; margin-left: 10px; cursor: pointer;">[Hapus]</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        cartTotalElement.textContent = formatRupiah(total);
        checkoutButton.disabled = false;
    };

    // Fungsi untuk menambahkan item ke keranjang
    const addToCart = (name, price, quantity = 1) => {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Fungsi untuk menghapus item dari keranjang
    const removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    // Fungsi format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    // Inisialisasi tampilan keranjang saat halaman dimuat
    updateCartDisplay();

    // 4. Event listener untuk semua tombol "Tambah ke Keranjang"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuName = e.target.getAttribute('data-menu-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            addToCart(menuName, price);
            alert(`${menuName} ditambahkan ke keranjang!`);
        });
    });

    // Event listener untuk tombol varian
    document.querySelectorAll('.variant-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const menuName = e.target.getAttribute('data-menu-name');
            const price = parseInt(e.target.getAttribute('data-price'));
            showModal(menuName, price);
        });
    });

    // 5. Event listener untuk tombol pilihan "Goreng"
    choiceGorengButton.addEventListener('click', () => {
        addToCart(`${currentMenuName} Goreng`, currentMenuPrice);
        alert(`${currentMenuName} Goreng ditambahkan ke keranjang!`);
        hideModal();
    });

    // 6. Event listener untuk tombol pilihan "Bakar"
    choiceBakarButton.addEventListener('click', () => {
        addToCart(`${currentMenuName} Bakar`, currentMenuPrice);
        alert(`${currentMenuName} Bakar ditambahkan ke keranjang!`);
        hideModal();
    });

    // 7. Event listener untuk tombol tutup modal varian
    closeButton.addEventListener('click', hideModal);

    // 8. Event listener untuk menutup modal varian ketika mengklik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // 9. Event listener untuk tombol keranjang
    cartButton.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    // 10. Event listener untuk tombol tutup modal keranjang
    cartCloseButton.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // 11. Event listener untuk menutup modal keranjang ketika mengklik di luar modal
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // 12. Event listener untuk tombol hapus item
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeItem(index);
        }
    });

    // 13. Event listener untuk tombol kosongkan keranjang
    clearCartButton.addEventListener('click', () => {
        if (confirm('Anda yakin ingin mengosongkan keranjang?')) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            alert('Keranjang dikosongkan.');
        }
    });

    // 14. Event listener untuk tombol Checkout via WhatsApp
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda kosong!');
            return;
        }

        let message = "Halo, saya mau pesan:\n\n";
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${item.quantity}x ${item.name} (${formatRupiah(item.price)}) = ${formatRupiah(itemTotal)}\n`;
        });

        message += `\nTotal Pesanan: ${formatRupiah(total)}\n\n`;
        message += "Mohon diproses ya, terima kasih!";

        const encodedMessage = encodeURIComponent(message);
        const waLinkWithQuery = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        window.open(waLinkWithQuery, '_blank');
        
        // Opsional: Kosongkan keranjang setelah checkout
        // cart = [];
        // localStorage.setItem('cart', JSON.stringify(cart));
        // updateCartDisplay();
        // cartModal.classList.remove('active');
    });
});
