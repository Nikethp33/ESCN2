document.addEventListener('DOMContentLoaded', () => {
    
    // Get the elements
    const buyerButton = document.getElementById('btn-buyer');
    const sellerButton = document.getElementById('btn-seller');
    const userRoleInput = document.getElementById('user-role');
    const signupLink = document.getElementById('signup-link');

    // --- NEW: Get image elements ---
    const buyerImage = document.getElementById('buyer-image');
    const sellerImage = document.getElementById('seller-image');

    // Define signup URLs
    const buyerSignupURL = 'consumer_signup.html';
    const sellerSignupURL = 'seller_signup.html';

    // Function to set the role based on a value
    function setRole(role) {
        if (role === 'seller') {
            // Set Seller as active
            sellerButton.classList.add('active');
            buyerButton.classList.remove('active');
            userRoleInput.value = 'seller';
            signupLink.href = sellerSignupURL;
            signupLink.text = 'Sign Up'; // Matches Figma design

            // --- NEW: Toggle images ---
            if (buyerImage && sellerImage) { // Check if elements exist
                buyerImage.style.display = 'none';
                sellerImage.style.display = 'block';
            }

        } else {
            // Default to Buyer
            buyerButton.classList.add('active');
            sellerButton.classList.remove('active');
            userRoleInput.value = 'buyer';
            signupLink.href = buyerSignupURL;
            signupLink.text = 'Sign Up'; // Matches Figma design

            // --- NEW: Toggle images ---
            if (buyerImage && sellerImage) { // Check if elements exist
                buyerImage.style.display = 'block';
                sellerImage.style.display = 'none';
            }
        }
    }

    // Check URL parameters when page loads
    const params = new URLSearchParams(window.location.search);
    const urlRole = params.get('role');
    
    // Set the initial role based on the URL
    setRole(urlRole);
    // --- END OF NEW CODE ---


    // --- EXISTING CODE ---
    // Event listener for the Buyer button (if user clicks to change)
    buyerButton.addEventListener('click', () => {
        setRole('buyer');
    });

    // Event listener for the Seller button (if user clicks to change)
    sellerButton.addEventListener('click', () => {
        setRole('seller');
    });
});