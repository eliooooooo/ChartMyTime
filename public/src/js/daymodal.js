console.log('daymodal.js');

export function dayModal(){
    let dayCards = document.querySelectorAll('.dayCard');
    let dayModal = document.querySelector('.dayModal');
    let dayModalClose = document.querySelector('.dayModalClose');
    
    dayCards.forEach(function(dayCard) {
        dayCard.addEventListener('click' , function() {
            let dayNumber = dayCard.dataset.day;
            console.log('clicked day ' + dayNumber);
            dayModal.classList.remove('hidden');
    
        });
    });

    dayModalClose.addEventListener('click', function() {
        dayModal.classList.add('hidden');
    });
} 



