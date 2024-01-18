// console.log('calendar.js');


class Calendar {

  /*
    Fonction pour récupérer la date actuelle
    Renvoie un objet avec les propriétés suivantes:
      currentNumber: le numéro du jour actuel
      currentMonth: le numéro du mois actuel
      currentYear: l'année actuelle
      currentDayOfWeek: le numéro du jour de la semaine actuel
  */
  getCurrentDate() {
    let currentDate = new Date();
    return currentDate = { currentNumber: currentDate.getDate(), currentMonth: currentDate.getMonth(), currentYear: currentDate.getFullYear(), currentDayOfWeek: currentDate.getDay() == 0 ? 7 : currentDate.getDay() };
  }

  /*
    Fonction pour définir les constantes
    Renvoie un objet avec les propriétés suivantes:
      months: les mois de l'année
      days: les jours de la semaine
      dp_days: display du jour de la semaine actuel
      dp_number: display du numéro du jour actuel
      dp_month: display du mois actuel
      dp_year: display de l'année actuelle
  */
  setConstants() {
    const currentDate = this.getCurrentDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let dp_days = document.querySelector('.days div:nth-child(' + (currentDate.currentDayOfWeek) + ')');
    let dp_number = document.querySelector('.days div:nth-child(' + (currentDate.currentNumber + 7) + ')');
    let dp_month = document.querySelector('.month');
    let dp_year = document.querySelector('.year');

    return { months: months, days: days, dp_days: dp_days, dp_number: dp_number, dp_month: dp_month, dp_year: dp_year };
  }


  /*
    Fonction pour définir le jour actuel et lui applique son style
    Ne renvoie rien
  */
  setCurrentDay(month, year) {
    const constants = setConstants();
    const currentDate = getCurrentDate();
    // console.log(currentDate);

    if (constants.dp_month.innerHTML == constants.months[currentDate.currentMonth] && constants.dp_year.innerHTML == currentDate.currentYear){
      constants.dp_days.classList.add('currentDay');
      constants.dp_number.classList.add('currentNumber');
      constants.dp_days.style.textDecoration = 'underline';
      constants.dp_number.style.textDecoration = 'underline';
    } else {
      constants.dp_days.classList.remove('currentDay');
      constants.dp_number.classList.remove('currentNumber');
      constants.dp_days.style.textDecoration = 'none';
      constants.dp_number.style.textDecoration = 'none';
    }
  }

  /* 
    Fonction pour sélectionner le jour actuel
    Ne renvoie rien
  */
  selectDayTag(month, year) {
    const constants = setConstants();
    // console.log(constants);

    const currentDate = getCurrentDate();
    // console.log(currentDate);

    setCurrentDay(month, year);
  }

  /*
    Fonction pour afficher le mois et l'année
    Ne renvoie rien
  */
  setMonthYear(month, year) {
    const constants = setConstants();

    constants.dp_month.innerHTML = constants.months[month];
    constants.dp_month.dataset.month = month;
    constants.dp_year.innerHTML = year;
    constants.dp_year.dataset.year = year;
  }

  /*
    Fonction pour afficher le mois suivant
    Ne renvoie rien
  */
  nextMonth() {
    const constants = setConstants();

    let currentMonth = constants.dp_month.dataset.month;
    let currentYear = constants.dp_year.dataset.year;

    currentMonth == 11 ? currentYear++ : currentYear;
    currentMonth++ == 11 ? currentMonth = 0 : currentMonth;

    displayCalendar(currentMonth, currentYear);
  }

  /*
    Fonction pour afficher le mois précédent
    Ne renvoie rien
  */
  previousMonth() {
    const constants = setConstants();

    let currentMonth = constants.dp_month.dataset.month;
    let currentYear = constants.dp_year.dataset.year;

    currentMonth == 0 ? currentYear-- : currentYear;
    currentMonth-- == 0 ? currentMonth = 11 : currentMonth;

    displayCalendar(currentMonth, currentYear);
  }

  /*
    Fonction pour afficher le mois actuel
    Ne renvoie rien
  */
  setCurrentMonth() {
    const constants = setConstants();
    const currentDate = getCurrentDate();

    displayCalendar(currentDate.currentMonth, currentDate.currentYear);
  }

  /*
    Fonction pour supprimer les anciens jours
    Ne renvoie rien
  */
  deleteOldDays() {
    let oldDays = document.querySelectorAll('.dayCard');

    if (oldDays) {
      oldDays.forEach(element => {
        element.remove();
      })
    }
  }

  /*
    Fonction pour afficher les jours du mois
    Ne renvoie rien
  */
  displayDays(nbDays, firstDay) {
    for (let j = 0; j < firstDay; j++) {
      let dayCard = document.createElement('div');
      dayCard.classList.add('dayCard');
      document.querySelector('.mainCalendar > div').appendChild(dayCard);
    }
    for (let i = 1; i <= nbDays; i++) {
      let dayNumber = document.createElement('div');
      dayNumber.classList.add('dayNumber');
      dayNumber.innerHTML = i;
      let dayCard = document.createElement('div');
      dayCard.classList.add('dayCard');
      dayCard.dataset.day = i;
      dayCard.appendChild(dayNumber);
      document.querySelector('.mainCalendar > div').appendChild(dayCard);
    }
  }

  /*
    Fonction pour définir les constantes pour le modal
    Renvoie un objet avec les propriétés suivantes:
      dayCards: les jours du mois
      dayModal: le modal
      modalDate: la date du modal
      modalMonth: le mois du modal
  */
  setModalDisplays() {
    let dayCards = document.querySelectorAll('.dayCard');
    let dayModal = document.querySelector('.dayModal');
    let modalDate = document.querySelector('.modalDate');
    let dayModalClose = document.querySelector('.dayModalClose');

    return { dayCards: dayCards, dayModal: dayModal, modalDate: modalDate, dayModalClose: dayModalClose };
  }

  /*
    Fonction pour afficher le modal
    Ne renvoie rien
  */
  displayModal() {
    const constants = setConstants();

    const modalDisplays = setModalDisplays();
    
    modalDisplays.dayCards.forEach(function(dayCard) {
        dayCard.addEventListener('click' , function() {
            let dayNumber = dayCard.dataset.day;
            modalDisplays.dayModal.classList.remove('hidden');
            let activeMonth = constants.months[constants.dp_month.dataset.month];
            let activeYear = constants.dp_year.dataset.year;
            modalDisplays.modalDate.innerHTML = dayNumber + ' ' + activeMonth + ' ' + activeYear;
        });
    });

    modalDisplays.dayModalClose.addEventListener('click', function() {
        modalDisplays.dayModal.classList.add('hidden');
    });
  }

  /*
    Fonction pour afficher le calendrier
    Ne renvoie rien
  */
  displayCalendar(month, year) {
    const constants = setConstants();
    const currentDate = getCurrentDate();

    setMonthYear(month, year);

    deleteOldDays();

    let nbDays = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 0).getDay();

    displayDays(nbDays, firstDay);
    setCurrentDay(month, year);
    displayModal();
  }
}

// Création de l'objet Calendar
const calendar = new Calendar();

// Définition des fonctions
const setConstants = calendar.setConstants.bind(calendar);
const getCurrentDate = calendar.getCurrentDate.bind(calendar);
const setCurrentDay = calendar.setCurrentDay.bind(calendar);
const selectDayTag = calendar.selectDayTag.bind(calendar);
const setMonthYear = calendar.setMonthYear.bind(calendar);
const nextMonth = calendar.nextMonth.bind(calendar);
const previousMonth = calendar.previousMonth.bind(calendar);
const setCurrentMonth = calendar.setCurrentMonth.bind(calendar);
const deleteOldDays = calendar.deleteOldDays.bind(calendar);
const displayDays = calendar.displayDays.bind(calendar);
const displayCalendar = calendar.displayCalendar.bind(calendar);
const setModalDisplays = calendar.setModalDisplays.bind(calendar);
const displayModal = calendar.displayModal.bind(calendar);

// Définition des constantes
const constants = calendar.setConstants();

// Création des variables de temps
let currentDate = getCurrentDate();

// Affichage du calendrier
constants.days.forEach(element => {
  let day = document.createElement('div');
  day.classList.add('day');
  day.innerHTML = element;
  document.querySelector('.days').appendChild(day);      
});
displayCalendar(currentDate.currentMonth, currentDate.currentYear);

let btn_nextMonth = document.querySelector('.nextMonth');
btn_nextMonth.addEventListener('click', nextMonth);
let btn_previousMonth = document.querySelector('.previousMonth');
btn_previousMonth.addEventListener('click', previousMonth);

// Fonction et click retour au mois actuel
let btn_currentMonth = document.querySelector('.backToCurrentMonth');
btn_currentMonth.addEventListener('click', setCurrentMonth);

// Gérer le formulaire de saisie de la date
document.querySelector('.formNewDate').addEventListener('submit', function(event) {
  event.preventDefault();
  let month = document.querySelector('#month').value;
  let year = document.querySelector('#year').value;
  let inputMonthYear = document.querySelector('.inputMonthYear');
  inputMonthYear.classList.remove('active');

  currentMonth = month;
  currentYear = year;

  displayCalendar(currentMonth, currentYear);
});