document.addEventListener('DOMContentLoaded', () => {
    
    // Get the form and input elements
    const signupForm = document.getElementById('seller-signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const gstinInput = document.getElementById('gstin');
    const errorMessage = document.getElementById('error-message');

    // Basic regex for GSTIN format validation
    // Format: 2 digits (state) + 5 letters (PAN) + 4 digits + 1 letter + 1 digit/letter + 1 letter (Z) + 1 digit/letter
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    signupForm.addEventListener('submit', (event) => {
        // Clear any previous error
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // 1. Check if passwords match
        if (password.value !== confirmPassword.value) {
            event.preventDefault(); // Stop form submission
            showError('Passwords do not match. Please try again.');
            password.focus();
            return; // Stop further validation
        }

        // 2. Check GSTIN format
        if (!gstinRegex.test(gstinInput.value.toUpperCase())) {
            event.preventDefault(); // Stop form submission
            showError('Invalid GSTIN format. Please check the number.');
            gstinInput.focus();
            return; // Stop further validation
        }
        
        // You can add more validation here
        // Note: Full GSTIN validation requires a backend API call to the GST network.
        // This regex only checks the *format*.
    });

    // Helper function to display errors
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});