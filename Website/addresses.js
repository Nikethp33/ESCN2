document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('add-address-toggle-btn');
    const cancelBtn = document.getElementById('cancel-add-address-btn');
    const formContainer = document.getElementById('add-address-form-container');

    // Show the form
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (formContainer) {
                formContainer.classList.remove('hidden');
            }
            toggleBtn.classList.add('hidden'); // Hide the "Add" button
        });
    }

    // Hide the form
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (formContainer) {
                formContainer.classList.add('hidden');
            }
            if (toggleBtn) {
                toggleBtn.classList.remove('hidden'); // Show the "Add" button again
            }
        });
    }

    // You would also add a 'submit' listener to the form
    // to send the data to the backend.
    
});