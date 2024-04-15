// console.log('calendar.js');


class Calendar {

  /**
   * Fonction pour récupérer la date actuelle
   * @returns {Object} avec les propriétés suivantes:
   *  currentNumber: le numéro du jour actuel
   *  currentMonth: le numéro du mois actuel
   *  currentYear: l'année actuelle
   *  currentDayOfWeek: le numéro du jour de la semaine actuel
   */
  getCurrentDate() {
    let currentDate = new Date();
    return currentDate = { currentNumber: currentDate.getDate(), currentMonth: currentDate.getMonth(), currentYear: currentDate.getFullYear(), currentDayOfWeek: currentDate.getDay() == 0 ? 7 : currentDate.getDay() };
  }

  /**
   * Fonction pour définir les constantes
   * 
   * @returns {Object} Les constantes suivantes:
   *  months: les mois de l'année 
   *  days: les jours de la semaine
   *  dp_days: le jour actuel
   *  dp_number: le numéro du jour actuel
   *  dp_month: le mois actuel
   *  dp_year: l'année actuelle
   */
  setConstants() {
    const currentDate = this.getCurrentDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let dp_days = document.querySelector('.days div:nth-child(' + (currentDate.currentDayOfWeek) + ')');
    let firstDay = new Date(currentDate.currentYear, currentDate.currentMonth, 0).getDay();
    let dp_number = document.querySelector('.days div:nth-child(' + (currentDate.currentNumber + firstDay + 7) + ')');
    let dp_month = document.querySelector('.month');
    let dp_year = document.querySelector('.year');

    return { months: months, days: days, dp_days: dp_days, dp_number: dp_number, dp_month: dp_month, dp_year: dp_year };
  }


  /**
   * Fonction pour définir le jour actuel et lui appliquer son style
   * 
   * @param {Number} month le mois actuel
   * @param {Number} year l'année actuelle
   * 
   * @returns {void}
   */
  setCurrentDay(month, year) {
    const constants = this.setConstants();
    const currentDate = this.getCurrentDate();
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

  /**
   * Fonction pour afficher le mois de l'année
   * 
   * @param {Number} month le mois de l'année
   * @param {Number} year l'année
   * 
   * @returns {void}
   */
  setMonthYear(month, year) {
    const constants = this.setConstants();

    constants.dp_month.innerHTML = constants.months[month];
    constants.dp_month.dataset.month = month;
    constants.dp_year.innerHTML = year;
    constants.dp_year.dataset.year = year;
  }

  /**
   * Fonction pour afficher le mois suivant
   * 
   * @returns {void}
   */
  nextMonth() {
    const constants = this.setConstants();
    const currentDate = this.getCurrentDate();

    let currentMonth = Number(constants.dp_month.dataset.month);
    let currentYear = Number(constants.dp_year.dataset.year);

    // Vérifie si le mois suivant est dans le futur
    if (currentYear > currentDate.currentYear || (currentYear === currentDate.currentYear && currentMonth >= currentDate.currentMonth)) {
      return;
    }
    
    currentMonth == 11 ? currentYear++ : currentYear;
    currentMonth++ == 11 ? currentMonth = 0 : currentMonth;

    this.displayCalendar(currentMonth, currentYear);
  }

  /**
   * fonction pour afficher le mois précédent
   * 
   * @returns {void}
   */
  previousMonth() {
    const constants = this.setConstants();
    const currentDate = this.getCurrentDate();

    let currentMonth = Number(constants.dp_month.dataset.month);
    let currentYear = Number(constants.dp_year.dataset.year);

    // Vérifie si le mois précédent est plus d'un an en arrière
    if (currentYear < currentDate.currentYear - 1 || (currentYear === currentDate.currentYear - 1 && currentMonth <= currentDate.currentMonth)) {
      return;
    }

    currentMonth == 0 ? currentYear-- : currentYear;
    currentMonth-- == 0 ? currentMonth = 11 : currentMonth;

    this.displayCalendar(currentMonth, currentYear);
  }

  /**
   * Fonction pour définir le mois actuel
   * 
   * @returns {void}
   */
  setCurrentMonth() {
    const currentDate = this.getCurrentDate();
    let body = document.querySelector('body');
    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add('success');
    notification.innerHTML = 'Back to current month.';
    body.appendChild(notification);

    setTimeout(function() { notification.style.opacity = '0'; }, 3000);

    displayCalendar(currentDate.currentMonth, currentDate.currentYear);
  }

  /**
   * Fonction pour définir la date du workspace via le formulaire
   * 
   * @returns {void}
   */
  setFormDate() {
    const constants = this.setConstants();  
    const currentDate = this.getCurrentDate();

    let month = document.querySelector('#month').value;
    let year = document.querySelector('#year').value;
    if (month && year && year >= currentDate.currentYear - 1 && year <= currentDate.currentYear && month >= 0 && month <= 11) {
      let oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.currentYear - 1);
      if ((year == currentDate.currentYear && month <= currentDate.currentMonth) || (year == oneYearAgo.getFullYear() && month >= oneYearAgo.getMonth())) {
        this.displayCalendar(month, year);
        if (year >= currentDate.currentYear && month >= currentDate.currentMonth) {
          btn_nextMonth.style.display = 'none';
        } else {
          btn_nextMonth.style.display = 'block';
        }

        if (year <= currentDate.currentYear - 1 && month <= currentDate.currentMonth) {
          btn_previousMonth.style.display = 'none';
        } else {
          btn_previousMonth.style.display = 'block';
        }
      }
    }
  }

  /**
   * Fonction pour supprimer les anciens jours 
   * 
   * @returns {void}
   */
  deleteOldDays() {
    let oldDays = document.querySelectorAll('.dayCard');

    if (oldDays) {
      oldDays.forEach(element => {
        element.remove();
      })
    }
  }

  /**
   * Fonction pour afficher les jours du mois
   * 
   * @param {Number} nbDays le nombre de jours du mois
   * @param {Number} firstDay le premier jour du mois
   * @param {Number} month le mois
   * @param {Number} year l'année
   * 
   * @returns {void}
   */
  displayDays(nbDays, firstDay, month, year) {
    for (let j = 0; j < firstDay; j++) {
      let dayCard = document.createElement('div');
      dayCard.classList.add('dayCard');
      dayCard.classList.add('empty');
      document.querySelector('.mainCalendar > div').appendChild(dayCard);
    }
    for (let i = 1; i <= nbDays; i++) {
      let dayNumber = document.createElement('div');
      dayNumber.classList.add('dayNumber');
      dayNumber.innerHTML = i;
      let dayCard = document.createElement('div');
      dayCard.classList.add('dayCard');
      dayCard.dataset.day = String(year)+'-'+String(month+1).padStart(2, '0')+'-'+String(i).padStart(2, '0'); 
      dayCard.setAttribute('x-on:click', 'dayModalOpen = true');
      dayCard.appendChild(dayNumber);
      document.querySelector('.mainCalendar > div').appendChild(dayCard);
    }
  }

  /**
   * Fonction pour récupérer la couleur de l'utilisateur sur le workspace
   * 
   * @returns {String} la couleur de l'utilisateur
   */
  getColor() {
    let color = document.querySelector('#calendar').dataset.color;
    const colorsRgb = {
      "63CDE9": 'rgba(99, 205, 233,',
      "D988B3": 'rgba(217, 136, 179,',
      "46A457": 'rgba(70, 164, 87,'
    }
    let currentColor = colorsRgb[color];

    return currentColor;
  }

  /**
   * Fonction pour définir les data des jours
   * 
   * @returns {void}
   */
  daysColor() {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let maxTime = 0;
    let currentColor = this.getColor();

    fetch('/chart-my-time/workspace?id=' + id)
      .then(response => {
        let jsonData = JSON.parse(response.headers.get('X-Json-Data'));

        for (let item of jsonData) {
          let time = parseFloat(item.time);
          if (time > maxTime) {
            maxTime = time;
          }
        }

        for (let item of jsonData) {
          let date = item.date;
          let time = item.time;
          let editDate = item.editDate;
          let comment = item.comments;
          let idDay = item.id;

          let calendarItem = document.querySelectorAll(`.dayCard`);
          calendarItem.forEach(element => {
            if (element.dataset.day === date){
              let tmpDate = editDate.replace(":", "h").split(":");
              element.dataset.editDate = tmpDate[0];
              element.dataset.time = time;
              element.dataset.comment = comment;
              element.dataset.id = idDay;
              let opacity = time / maxTime;
              element.dataset.opacity = opacity;
              element.style.backgroundColor = currentColor+opacity+')';
              return;
            }
          });

          if (calendarItem) {
            calendarItem.textContent = time;
          }
        }        
      })
      .catch(error => console.error(error));
  }

  /**
   * Fonction pour afficher la navigation
   * 
   * @param {Number} month le mois
   * @param {Number} year l'année
   * 
   * @returns {void}
   */
  displayNav(month, year) {
    const constants = this.setConstants();
    const currentDate = this.getCurrentDate();
    let btn_nextMonth = document.querySelector('.nextMonth');
    let btn_previousMonth = document.querySelector('.previousMonth');
    btn_previousMonth.style.display = 'block';
    btn_nextMonth.style.display = 'block';

    if (year > currentDate.currentYear || (year === currentDate.currentYear && month >= currentDate.currentMonth)) {
      btn_nextMonth.style.display = 'none';
    }

    if (year < currentDate.currentYear - 1 || (year === currentDate.currentYear - 1 && month <= currentDate.currentMonth)) {
      btn_previousMonth.style.display = 'none';
    }
  }

  /**
   * Fonction pour définir les constantes pour le modal
   * 
   * @returns {Object} avec les propriétés suivantes:
   *  dayCards: les jours du mois
   *  dayModal: le modal
   *  modalDate: la date du modal 
   *  modalMonth: le mois du modal
   */
  setModalDisplays() {
    const dayCards = document.querySelectorAll('.dayCard:not(.empty)');
    const dayModal = document.querySelector('.dayModal');
    const modalDate = document.querySelector('.modalDate');
    const dayModalClose = document.querySelector('.dayModalClose');
    const DetailsTimeTime = document.querySelector('.DetailsTimeTime');
    const detailOnOpen = document.querySelector('.detailOnOpen');
    const detailTimeDay = document.querySelector('.detailsTimeDay');
    const detailError = document.querySelector('.detailError');
    const colordetailTime = document.querySelector('.colorDetailTime');
    const detailComment = document.querySelector('.detailComment');
    const deleteDetailTime = document.querySelector('.deleteDetailTime');
    const inputDate = document.querySelector('#inputDate');
    const inputWorkspace = document.querySelector('#inputWorkspace');
    const formAddTime = document.querySelector('#formAddTime');
    const modalComment = document.querySelector('#modalComment');
    const modalTime = document.querySelector('#modalTime');

    return { dayCards: dayCards, dayModal: dayModal, modalDate: modalDate, dayModalClose: dayModalClose, DetailsTimeTime: DetailsTimeTime, detailOnOpen: detailOnOpen, detailTimeDay: detailTimeDay, detailError: detailError, colordetailTime: colordetailTime, detailComment: detailComment, deleteDetailTime: deleteDetailTime, inputDate: inputDate, inputWorkspace: inputWorkspace, formAddTime: formAddTime, modalComment: modalComment, modalTime: modalTime};
  }

  /**
   * Fonction pour formater le temps
   * 
   * @param {Number} time le temps
   * 
   * @returns {String} le temps formaté
   */
  formatTime(time) {
    let hours = Math.floor(time);
    let minutes = Math.round((time - hours) * 60);
    return hours + 'h' + String(minutes).padStart(2, '0');
  }

  /**
   * Fonction pour afficher le modal
   * 
   * @returns {void}
   */
  displayModal() {
    const constants = this.setConstants();
    const currentColor = this.getColor();
    const modalDisplays = this.setModalDisplays();
    const self = this;
    
    modalDisplays.dayCards.forEach(function(dayCard) {
        dayCard.addEventListener('click' , function() {
            let dayNumber = dayCard.dataset.day;
            if (dayCard.dataset.time) {
              modalDisplays.DetailsTimeTime.innerHTML = self.formatTime(dayCard.dataset.time);
              modalDisplays.detailTimeDay.innerHTML = dayCard.getAttribute('data-edit-date');
              modalDisplays.detailOnOpen.classList.remove('hidden');
              modalDisplays.detailError.classList.add('hidden');
              const opacity = dayCard.dataset.opacity;
              modalDisplays.colordetailTime.style.backgroundColor = currentColor+opacity+')';
              modalDisplays.deleteDetailTime.href = '/chart-my-time/day?action=delete&id=' + dayCard.dataset.id;
              modalDisplays.formAddTime.action = '/chart-my-time/day?action=update&id=' + dayCard.dataset.id;
              if (dayCard.dataset.comment && dayCard.dataset.comment != 'null' && dayCard.dataset.comment != 'undefined' && dayCard.dataset.comment != '') {
                modalDisplays.detailComment.innerHTML = dayCard.dataset.comment;
              } else {
                modalDisplays.detailComment.innerHTML = 'No comments.';
              }
            } else {
              modalDisplays.formAddTime.action = '/chart-my-time/day?action=create';
              modalDisplays.DetailsTimeTime.innerHTML = '';
              modalDisplays.detailOnOpen.classList.add('hidden');
              modalDisplays.detailError.classList.remove('hidden');
              modalDisplays.colordetailTime.style.backgroundColor = '#fff';
            }
            modalDisplays.modalComment.value = '';
            modalDisplays.modalTime.value = '';
            modalDisplays.inputDate.value = dayNumber;
            modalDisplays.inputWorkspace.value = document.querySelector('#calendar').dataset.id;
            let split = dayNumber.split('-');
            dayNumber = split[2];
            modalDisplays.dayModal.classList.remove('hidden');
            let activeMonth = constants.months[constants.dp_month.dataset.month];
            let activeYear = constants.dp_year.dataset.year;
            modalDisplays.modalDate.innerHTML = dayNumber + ' ' + activeMonth + ' ' + activeYear;
        });
    });
  }

  /**
   * Fonction pour afficher le calendrier
   * 
   * @param {Number} month le mois
   * @param {Number} year l'année
   * 
   * @returns {void}
   */
  displayCalendar(month, year) {

    this.setMonthYear(month, year);

    this.deleteOldDays();

    let nbDays = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 0).getDay();

    this.displayDays(nbDays, firstDay, month, year);
    this.daysColor();
    this.setCurrentDay(month, year);
    this.displayModal();
    this.displayNav(month, year);
  }
}

// Création de l'objet Calendar
const calendar = new Calendar();

// Définition des fonctions
const setConstants = calendar.setConstants.bind(calendar);
const getCurrentDate = calendar.getCurrentDate.bind(calendar);
const setCurrentDay = calendar.setCurrentDay.bind(calendar);
const setMonthYear = calendar.setMonthYear.bind(calendar);
const nextMonth = calendar.nextMonth.bind(calendar);
const previousMonth = calendar.previousMonth.bind(calendar);
const setCurrentMonth = calendar.setCurrentMonth.bind(calendar);
const setFormDate = calendar.setFormDate.bind(calendar);
const deleteOldDays = calendar.deleteOldDays.bind(calendar);
const displayDays = calendar.displayDays.bind(calendar);
const daysColor = calendar.daysColor.bind(calendar);
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

let dayCard = document.querySelectorAll('.dayCard');
dayCard.forEach(element => {
  element.addEventListener('click', function() {
    displayModal();
  });
});

let btn_nextMonth = document.querySelector('.nextMonth');
btn_nextMonth.addEventListener('click', nextMonth);
let btn_previousMonth = document.querySelector('.previousMonth');
btn_previousMonth.addEventListener('click', previousMonth);

// Fonction et click retour au mois actuel
let btn_currentMonth = document.querySelector('.backToCurrentMonth');
btn_currentMonth.addEventListener('click', setCurrentMonth);

// Gérer le formulaire de saisie de la date 
let formNewDate = document.querySelector('.formNewDate');
formNewDate.addEventListener('submit', function(event) {
  event.preventDefault();
  setFormDate();
});