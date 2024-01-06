// console.log('input.js');

import { displayCalendar, selectDayTag } from './calendar.js';

// InputMonthYear

let inputMonthYear = document.querySelector('.inputMonthYear');
let toggle = document.querySelector('.togglesvg');
toggle.addEventListener('click', function() {
    if (inputMonthYear.classList.contains('active') == false) {
        inputMonthYear.classList.add('active');
    }
});

let closeFormMonthYear = document.querySelector('.closeFormMonthYear');
closeFormMonthYear.addEventListener('click', function(event) {
    inputMonthYear.classList.remove('active');
    console.log('click');
    console.log(inputMonthYear.classList);
});

// Gérer le formulaire de saisie de la date
document.querySelector('.formNewDate').addEventListener('submit', function(event) {
    event.preventDefault();
    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    let inputMonthYear = document.querySelector('.inputMonthYear');
    inputMonthYear.classList.remove('active');
    // console.log('Month: ' + month);
    // console.log('Year: ' + year);

    displayCalendar(month, year);
    selectDayTag(month, year);
});