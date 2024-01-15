console.log('daymodal.js');

let dayCards = document.querySelectorAll('.dayCard');

dayCards.forEach(function(dayCard) {
    dayCard.addEventListener('click' , function() {
        let dayNumber = dayCard.dataset.day;
        console.log('clicked day ' + dayNumber);
    });
});