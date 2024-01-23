// import les feuilles de stle
import './../css/style.css';

// import de Alpine
import Alpine from 'alpinejs'
window.Alpine = Alpine

Alpine.start()

// import de tippy.js
import tippy from 'tippy.js';

document.addEventListener('DOMContentLoaded', (event) => {
    tippy('[data-tippy-content]');
});

setTimeout(function() {
    let element = document.querySelector('.notification');
    if (element) {
        element.style.opacity = '0';
    }
}, 3000); // 3000 milliseconds = 3 seconds