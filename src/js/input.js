console.log('input.js');

// InputMonthYear

let inputMonthYear = document.querySelector('.inputMonthYear');
inputMonthYear.addEventListener('click', function() {
    if (inputMonthYear.classList.contains('active')) {
        inputMonthYear.classList.remove('active');
    } else {
        inputMonthYear.classList.add('active');
    }
});