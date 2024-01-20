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