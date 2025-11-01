document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation ---
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const contentSections = document.querySelectorAll('.main-content .content-section');

    // Handle sidebar navigation clicks
    navLinks.forEach(link => {
        // Only add listeners to links that point to a tab (start with #)
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1); 
                
                if (link.classList.contains('active')) return;

                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                contentSections.forEach(s => s.classList.remove('active'));

                // Add active class to the clicked link and target section
                link.classList.add('active');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        }
    });

    // --- (Frontend Only) Add Product to Table ---
    const addProductForm = document.getElementById('add-product-form');
    const productListBody = document.getElementById('product-list');

    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const price = document.getElementById('discount-price').value;
            const quantity = document.getElementById('product-quantity').value;
            const expiry = document.getElementById('expiry-date').value;

            // Create and add the new row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${category}</td>
                <td>$${parseFloat(price).toFixed(2)}</td>
                <td>${quantity}</td>
                <td>${expiry}</td>
                <td>
                    <button class="btn-edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            productListBody.prepend(newRow);
            addProductForm.reset();
            document.getElementById('nav-products').click();
        });
    }

    // --- (Frontend Only) Delete Product from Table ---
    if (productListBody) {
        productListBody.addEventListener('click', (e) => {
            const deleteButton = e.target.closest('.btn-delete');
            if (deleteButton) {
                deleteButton.closest('tr').remove();
            }
        });
    }

});