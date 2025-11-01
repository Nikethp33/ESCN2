document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation ---
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const contentSections = document.querySelectorAll('.main-content .content-section');

    // Handle sidebar navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1); // Get "dashboard", "my-products", etc.
            
            // Don't do anything if it's already active
            if (link.classList.contains('active')) return;

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Add active class to the clicked link and target section
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Add Product Form Logic ---
    const addProductForm = document.getElementById('add-product-form');
    const productListBody = document.getElementById('product-list');
    const formError = document.getElementById('form-error');

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formError.style.display = 'none';

        // Get form values
        const name = document.getElementById('product-name').value;
        const category = document.getElementById('product-category').value;
        const price = document.getElementById('discount-price').value;
        const quantity = document.getElementById('product-quantity').value;
        const expiry = document.getElementById('expiry-date').value;

        // Simple Validation
        if (!name || !category || !price || !quantity || !expiry) {
            formError.textContent = 'Please fill out all required fields.';
            formError.style.display = 'block';
            return;
        }

        // --- Simulate adding to table ---
        // (In a real app, this data would be sent to a backend)
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
        
        // Add the new row to the top of the table
        productListBody.prepend(newRow);

        // Reset the form
        addProductForm.reset();

        // Switch back to the "My Products" tab to show the new item
        document.getElementById('nav-products').click();
    });

    // --- Delete Product Logic ---
    // Add one event listener to the table body to handle all delete clicks
    productListBody.addEventListener('click', (e) => {
        // Check if the clicked element (or its parent) is a delete button
        const deleteButton = e.target.closest('.btn-delete');
        
        if (deleteButton) {
            // Find the table row (tr) and remove it
            const rowToRemove = deleteButton.closest('tr');
            rowToRemove.remove();
            
            // In a real app, you would also send a request to the backend to delete this item
        }
    });

});