// console.log('calendar.js');
// Définition des possibilitées
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];

// Création des variables de temps
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentDayOfWeek = currentDate.getDay();

// Création de la structure HTML
// Affichage des jours de la semaine
days.forEach(element => {
  let day = document.createElement('div');
  day.classList.add('day');
  day.innerHTML = element;
  document.querySelector('.mainCalendar > div').appendChild(day);
});

// Affichage du mois actuel
let dp_month = document.querySelector('.month');
dp_month.innerHTML = months[currentMonth];

// Affichage de l'année actuelle
let dp_year = document.querySelector('.year');
dp_year.innerHTML = currentYear;

// Affichage du jour de la semaine actuel
export function selectDayTag(month, year) {
  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentDayOfWeek = currentDate.getDay();
  if (currentDayOfWeek == 0) {
    currentDayOfWeek = 7;
  }
  let dp_days = document.querySelector('.days div:nth-child(' + (currentDayOfWeek) + ')');
  let dp_number = document.querySelector('.days div:nth-child(' + (currentDay + 7) + ')');
  dp_days.classList.add('currentDay');
  dp_number.classList.add('currentNumber');
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  if (dp_month.innerHTML == months[currentMonth] && dp_year.innerHTML == currentYear){
    dp_days.style.textDecoration = 'underline';
    dp_number.style.textDecoration = 'underline';
  } else {
    dp_days.style.textDecoration = 'none';
  }
}

// Fonction et click pour afficher le mois suivant/précédent
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  dp_month.innerHTML = months[currentMonth];
  dp_year.innerHTML = currentYear;
  displayCalendar(currentMonth, currentYear);
  selectDayTag(currentMonth, currentYear)
}
function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  dp_month.innerHTML = months[currentMonth];
  dp_year.innerHTML = currentYear;
  displayCalendar(currentMonth, currentYear);
  selectDayTag(currentMonth, currentYear)
}

let btn_nextMonth = document.querySelector('.nextMonth');
btn_nextMonth.addEventListener('click', nextMonth);
let btn_previousMonth = document.querySelector('.previousMonth');
btn_previousMonth.addEventListener('click', previousMonth);

// Fonction et click retour au mois actuel
function setCurrentMonth() {
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  dp_month.innerHTML = months[currentMonth];
  dp_year.innerHTML = currentYear;
  displayCalendar(currentMonth, currentYear);
  selectDayTag(currentMonth, currentYear)
}

let btn_currentMonth = document.querySelector('.backToCurrentMonth');
btn_currentMonth.addEventListener('click', setCurrentMonth);

// Fonction pour afficher le calendrier
export function displayCalendar(month, year) {
  dp_month.innerHTML = months[month];
  dp_year.innerHTML = year;

  // Suppression des anciens jours
  let oldDays = document.querySelectorAll('.dayCard');
  if (oldDays) {
  oldDays.forEach(element => {
    element.style.opacity = '0';
    element.remove();
  })};
  

  let nbDays = new Date(year, month, 0).getDate();
  let firstDay = new Date(year, month, 0).getDay();
  // Affichage des jours du mois (le bon jour de la semaine)
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
    dayCard.appendChild(dayNumber);
    document.querySelector('.mainCalendar > div').appendChild(dayCard);
  }
}

// Gérer le formulaire de saisie de la date
document.querySelector('.formNewDate').addEventListener('submit', function(event) {
  event.preventDefault();
  let month = document.querySelector('#month').value;
  let year = document.querySelector('#year').value;
  let inputMonthYear = document.querySelector('.inputMonthYear');
  inputMonthYear.classList.remove('active');
  // console.log('Month: ' + month);
  // console.log('Year: ' + year);

  currentMonth = month;
  currentYear = year;
  displayCalendar(month, year);
  selectDayTag(month, year);
});

displayCalendar(currentMonth, currentYear);
selectDayTag(currentMonth, currentYear);
// console.log(currentDate);
// console.log(currentYear);
// console.log(currentMonth);
// console.log(currentDay);
// console.log(currentDayOfWeek);
