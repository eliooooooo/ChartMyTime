document.addEventListener('DOMContentLoaded', (event) => {
    let navLinks = document.querySelectorAll('a');
    let currentUrl = window.location.href;

    navLinks.forEach((link) => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        }
    });
});