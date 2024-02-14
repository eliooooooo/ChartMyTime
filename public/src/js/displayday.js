let params = new URLSearchParams(window.location.search);
let id = params.get('id');

function fetchAndUpdateCalendar() {
    fetch('/workspace?id=' + id)
        .then(response => {
            // Récupérez les données JSON de l'en-tête de la réponse
            let jsonData = JSON.parse(response.headers.get('X-Json-Data'));

            // Parcourez le tableau 'days'
            for (let item of jsonData) {
                let date = item.date;
                let time = item.time;

                // Trouvez l'élément du calendrier correspondant à cette date
                let calendarItem = document.querySelectorAll(`.dayCard`);
                calendarItem.forEach(element => {
                    if (element.dataset.day === date){
                        element.style.backgroundColor = 'rgba(125, 125, 125, 0.'+time+')';
                        return;
                    }
                });

                // Ajoutez l'événement à l'élément du calendrier
                if (calendarItem) {
                    calendarItem.textContent = time;
                }
            }
        })
        .catch(error => console.error(error));
}

// Appeler la fonction au chargement de la page
fetchAndUpdateCalendar();

// Appeler la fonction chaque fois que le mois change
document.getElementsByClassName('previousMonth').addEventListener('change', fetchAndUpdateCalendar);
document.getElementsByClassName('nextMonth').addEventListener('change', fetchAndUpdateCalendar);