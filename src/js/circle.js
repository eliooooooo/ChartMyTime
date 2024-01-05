// console.log("circle.js");

let colorCircle = ['radial-gradient(circle, rgba(232,178,202,1) 0%, rgba(208,110,166,1) 100%)', 'radial-gradient(circle, rgba(178,232,230,1) 0%, rgba(55,190,236,1) 86%, rgba(110,181,208,1) 100%)', 'radial-gradient(circle, rgba(137,233,119,1) 0%, rgba(28,120,66,1) 100%)'];

let clientWidth = document.querySelector('.circleContainer').clientWidth;
let clientHeight = document.querySelector('.circleContainer').clientHeight;

window.onresize = function() {
    clientWidth = document.querySelector('.circleContainer').clientWidth;
    clientHeight = document.querySelector('.circleContainer').clientHeight;
    // console.log(clientWidth);
    // console.log(clientHeight);
}

let heightCalendar = document.querySelector('#calendar').clientHeight;
let circleContainer = document.querySelector('.circleContainer');
circleContainer.style.height = heightCalendar + 'px';

nbCircle = 3;
maxWidth = clientWidth * 0.5;

function createCircle(i, width, left, top) {
    let circle = document.createElement('div');
    circle.classList.add('circle');
    circle.setAttribute('id', 'circle' + (i+1));
    circle.style.width = width + 'px';
    circle.style.height = width + 'px';
    circle.style.borderRadius = 50 + '%';
    circle.style.background = colorCircle[i];
    circle.style.position = 'absolute';
    circle.style.top = top + 'px';
    circle.style.left = left + 'px';
    circle.style.zIndex = '-1';
    document.querySelector('.circleContainer').appendChild(circle);
}

for (let i = 0; i < nbCircle; i++) {
    let tmp_width = Math.floor(Math.random() * maxWidth);
    let width = tmp_width > 0 ? tmp_width : tmp_width * -1;
    tmp_left = Math.floor(Math.random() * (clientWidth - width));
    let left = tmp_left > 0 ? tmp_left : tmp_left * -1;
    tmp_top = Math.floor(Math.random() * (clientHeight - width));
    let top = tmp_top > 0 ? tmp_top : tmp_top * -1;
    createCircle(i, width, left, top);
}