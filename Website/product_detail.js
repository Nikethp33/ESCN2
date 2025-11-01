document.addEventListener('DOMContentLoaded', () => {
    
    // Get all tab header buttons
    const tabLinks = document.querySelectorAll('.tab-link');
    
    // Get all tab content sections
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Get the target tab ID from the 'data-tab' attribute
            const tabId = link.dataset.tab;
            
            // Remove 'active' class from all links and content
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));
            
            // Add 'active' class to the clicked link
            link.classList.add('active');
            
            // Add 'active' class to the corresponding content
            document.getElementById(tabId).classList.add('active');
        });
    });

});