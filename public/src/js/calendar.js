// console.log('calendar.js');

import { dayModal } from "./daymodal";

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
export function setConstants() {
  const currentDate = getCurrentDate();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let dp_days = document.querySelector('.days div:nth-child(' + (currentDate.currentDayOfWeek) + ')');
  let dp_number = document.querySelector('.days div:nth-child(' + (currentDate.currentNumber + 7) + ')');
  let dp_month = document.querySelector('.month');
  let dp_year = document.querySelector('.year');

  return { months: months, days: days, dp_days: dp_days, dp_number: dp_number, dp_month: dp_month, dp_year: dp_year };
}

/*
  Fonction pour récupérer la date actuelle
  Renvoie un objet avec les propriétés suivantes:
    currentNumber: le numéro du jour actuel
    currentMonth: le numéro du mois actuel
    currentYear: l'année actuelle
    currentDayOfWeek: le numéro du jour de la semaine actuel
*/
export function getCurrentDate() {
  let currentDate = new Date();
  return currentDate = { currentNumber: currentDate.getDate(), currentMonth: currentDate.getMonth(), currentYear: currentDate.getFullYear(), currentDayOfWeek: currentDate.getDay() == 0 ? 7 : currentDate.getDay() };
}

/*
  Fonction pour définir le jour actuel et lui applique son style
  Ne renvoie rien
*/
export function setCurrentDay(month, year) {
  const constants = setConstants();
  const currentDate = getCurrentDate();
  // console.log(currentDate);

  if (constants.dp_month.innerHTML == months[currentDate.currentMonth] && constants.dp_year.innerHTML == currentDate.currentYear){
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
export function selectDayTag(month, year) {
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
export function setMonthYear(month, year) {
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
function nextMonth() {
  const constants = setConstants();

  let currentMonth = constants.dp_month.dataset.month;
  let currentYear = constants.dp_year.dataset.year;
  currentMonth == 11 ? currentYear++ : currentYear;
  currentMonth++ == 11 ? currentMonth = 0 : currentMonth;

  setMonthYear(currentMonth, currentYear);
  displayCalendar(currentMonth, currentYear);
  selectDayTag(currentMonth, currentYear)
}

/*
  Fonction pour afficher le mois précédent
  Ne renvoie rien
*/
function previousMonth() {
  const constants = setConstants();

  let currentMonth = constants.dp_month.dataset.month;
  let currentYear = constants.dp_year.dataset.year;

  currentMonth == 0 ? currentYear-- : currentYear;
  currentMonth-- == 0 ? currentMonth = 11 : currentMonth;

  setMonthYear(currentMonth, currentYear);
  displayCalendar(currentMonth, currentYear);
  selectDayTag(currentMonth, currentYear)
}

/*
  Fonction pour afficher le mois actuel
  Ne renvoie rien
*/
function setCurrentMonth() {
  const constants = setConstants();
  const currentDate = getCurrentDate();

  setMonthYear(currentDate.currentMonth, currentDate.currentYear);
  displayCalendar(currentDate.currentMonth, currentDate.currentYear);
  selectDayTag(currentDate.currentMonth, currentDate.currentYear)
}

// Fonction pour afficher le calendrier
export function displayCalendar(month, year) {
  const constants = setConstants();
  const currentDate = getCurrentDate();

  setMonthYear(month, year);

  // Suppression des anciens jours
  let oldDays = document.querySelectorAll('.dayCard');
  if (oldDays) {
  oldDays.forEach(element => {
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
    dayCard.dataset.day = i;
    dayCard.appendChild(dayNumber);
    document.querySelector('.mainCalendar > div').appendChild(dayCard);
  }
  dayModal();
}

// Définition des possibilitées
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'October', 'November', 'December'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

// Fonction et click pour afficher le mois suivant/précédent
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
  // console.log('Month: ' + month);
  // console.log('Year: ' + year);

  currentMonth = month;
  currentYear = year;
  displayCalendar(month, year);
  selectDayTag(month, year);
});

// console.log(currentDate);
// console.log(currentYear);
// console.log(currentMonth);
// console.log(currentDay);
// console.log(currentDayOfWeek);
displayCalendar(currentMonth, currentYear);
selectDayTag(currentMonth, currentYear);

