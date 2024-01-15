console.log('daymodal.js');

export function dayModal(){
    let dayCards = document.querySelectorAll('.dayCard');
    let dayModal = document.querySelector('.dayModal');
    let dayModalClose = document.querySelector('.dayModalClose');
    let modalDate = document.querySelector('.modalDate');
    let modalMonth = document.querySelector('.modalMonth');
    let activeMonth = document.querySelector('.month');
    let activeYear = document.querySelector('.year');
    
    dayCards.forEach(function(dayCard) {
        dayCard.addEventListener('click' , function() {
            let dayNumber = dayCard.dataset.day;
            console.log('clicked day ' + dayNumber);
            dayModal.classList.remove('hidden');
            modalDate.innerHTML = dayNumber + ' ' + activeMonth.innerHTML + ' ' + activeYear.innerHTML;
        });
    });

    dayModalClose.addEventListener('click', function() {
        dayModal.classList.add('hidden');
    });
} 



