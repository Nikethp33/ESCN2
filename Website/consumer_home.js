document.addEventListener('DOMContentLoaded', () => {

    // --- Modal/Drawer Elements ---
    
    const cartBtn = document.getElementById('cart-btn');
    
    const cartModal = document.getElementById('cart-modal');
    
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const overlay = document.getElementById('modal-overlay');

    // --- Cart Logic Elements ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMsg = document.querySelector('.cart-empty-msg');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    // In-memory cart
    let cart = [];

    // --- Modal Open/Close Functions ---
    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('open');
        if (overlay) overlay.classList.remove('hidden');
    };

    const closeModal = () => {
        
        if (cartModal) cartModal.classList.remove('open');
        if (overlay) overlay.classList.add('hidden');
    };
 
    if (cartBtn) cartBtn.addEventListener('click', () => openModal(cartModal)); 
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    
    // --- Cart Functions (No changes here) ---

    // 1. Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;
            const productPrice = parseFloat(button.dataset.price);
            cart.push({ name: productName, price: productPrice });
            updateCart();
            button.textContent = 'Added!';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 1000);
        });
    });

    // 2. Remove from Cart
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-btn')) {
                const itemIndex = parseInt(event.target.dataset.index);
                cart.splice(itemIndex, 1);
                updateCart();
            }
        });
    }


    // 3. Main Update Function
    function updateCart() {
        if (!cartItemsList || !cartEmptyMsg) return;
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.appendChild(cartEmptyMsg);
        } else {
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="cart-item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">Remove</button>
                `;
                cartItemsList.appendChild(itemEl);
            });
            if (cartTotalSpan) cartTotalSpan.textContent = `$${total.toFixed(2)}`;
        }
        if (cartCountSpan) cartCountSpan.textContent = cart.length;
    }


    // --- HOVER TOOLTIP LOGIC ---
    const tooltip = document.getElementById('product-tooltip');
    const productCards = document.querySelectorAll('.product-card');

    if (tooltip) {
        const moveTooltip = (e) => {
            let x = e.clientX + 15;
            let y = e.clientY + 15;
            if (x + tooltip.offsetWidth > window.innerWidth) {
                x = e.clientX - tooltip.offsetWidth - 15;
            }
            if (y + tooltip.offsetHeight > window.innerHeight) {
                y = e.clientY - tooltip.offsetHeight - 15;
            }
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        };

        productCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const titleEl = card.querySelector('h3');
                const sellerEl = card.querySelector('.product-brand');
                const title = titleEl ? titleEl.textContent : "Product";
                const seller = sellerEl ? sellerEl.textContent : "Unknown Seller";
                const desc = "A high-quality product, fresh and ready for you.";

                tooltip.innerHTML = `
                    <h4>${title}</h4>
                    <p>${desc}</p>
                    <p class="tooltip-seller">Sold by: ${seller}</p>
                `;
                tooltip.classList.add('visible');
                moveTooltip(e);
                document.addEventListener('mousemove', moveTooltip);
            });

            card.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
                document.removeEventListener('mousemove', moveTooltip);
            });
        });
    }


    // --- NEW: CAROUSEL LOGIC ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (track && slides.length > 0) {
        let currentSlide = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;

        // 1. Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer ? dotsContainer.children : []);

        // 2. Function to move slide
        const moveToSlide = (targetIndex) => {
            // Loop back to start or end
            if (targetIndex < 0) {
                targetIndex = slides.length - 1;
            } else if (targetIndex >= slides.length) {
                targetIndex = 0;
            }
            
            track.style.transform = `translateX(-${100 * targetIndex}%)`;
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[targetIndex].classList.add('active');
            
            currentSlide = targetIndex;
        };

        // 3. Click listeners for arrows
        nextButton.addEventListener('click', () => {
            moveToSlide(currentSlide + 1);
        });
        prevButton.addEventListener('click', () => {
            moveToSlide(currentSlide - 1);
        });

        // 4. Click listeners for dots
        dotsContainer.addEventListener('click', e => {
            if (!e.target.matches('.carousel-dot')) return;
            
            const targetIndex = parseInt(e.target.dataset.index);
            moveToSlide(targetIndex);
        });
        
        // 5. Auto-play
        setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 5000); // 5-second delay
    }

});