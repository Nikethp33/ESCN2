document.addEventListener('DOMContentLoaded', () => {
    
    // Get the form and input elements
    const signupForm = document.getElementById('consumer-signup-form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', (event) => {
        // Clear any previous error
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // Check if passwords match
        if (password.value !== confirmPassword.value) {
            // Prevent the form from submitting
            event.preventDefault(); 
            
            // Display an error message
            errorMessage.textContent = 'Passwords do not match. Please try again.';
            errorMessage.style.display = 'block';
            
            // Focus on the first password field
            password.focus();
        }
        
        // You can add more validation here (e.g., password strength, email format)
    });
});