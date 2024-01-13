console.log('daymodal.js');

let dayCards = document.querySelectorAll('.dayCard');

dayCards.forEach(function(dayCard) {
    dayCard.addEventListener('click' , function() {
        dayNumber = dayCard.dataset.day;
        console.log(dayNumber);
    });
}); QUOI