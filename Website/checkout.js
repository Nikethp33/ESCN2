document.addEventListener('DOMContentLoaded', () => {

    // Get all radio buttons
    const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
    
    // Get all payment content sections
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');
    const codDetails = document.getElementById('cod-details');
    const allPaymentContents = [cardDetails, upiDetails, codDetails];

    // Get the place order button
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Add event listener to each radio button
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedValue = e.target.value;

            // Hide all payment sections
            allPaymentContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected one
            if (selectedValue === 'card') {
                cardDetails.classList.add('active');
            } else if (selectedValue === 'upi') {
                upiDetails.classList.add('active');
            } else if (selectedValue === 'cod') {
                codDetails.classList.add('active');
            }
        });
    });

    // Handle "Place Order" button click
    placeOrderBtn.addEventListener('click', () => {
        // In a real app, this would validate the form
        // and send data to a payment gateway.
        
        // For now, we'll just show a success message.
        alert('Order placed successfully! Thank you for shopping with EcoMart.');
        
        // Redirect to the home page after success
        window.location.href = 'consumer_home.html';
    });

});