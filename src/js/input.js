console.log('input.js');

// InputMonthYear

var inputMonthYear = document.querySelector('.inputMonthYear');
inputMonthYear.addEventListener('click', function() {
    if (inputMonthYear.classList.contains('active') == false) {
        inputMonthYear.classList.add('active');
    }
});

let closeFormMonthYear = document.querySelector('.closeFormMonthYear');
closeFormMonthYear.addEventListener('click', function() {
    inputMonthYear.classList.remove('active');
    console.log('click');
    console.log(inputMonthYear);
});

console.log(closeFormMonthYear);