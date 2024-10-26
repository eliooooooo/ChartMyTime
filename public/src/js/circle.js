class Circle {
    constructor(width, left, top) {
        this.width = width;
        this.left = left;
        this.top = top;
        this.colorCircle = this.getColor();
    }

    /**
     * Fonction pour avoir les fiddérentes couleurs des cercles
     * 
     * @returns {Array} colorCircle
     */
    getColor() {
        let colorCircle = ['radial-gradient(circle, rgba(232,178,202,1) 0%, rgba(208,110,166,1) 100%)', 'radial-gradient(circle, rgba(178,232,230,1) 0%, rgba(55,190,236,1) 86%, rgba(110,181,208,1) 100%)', 'radial-gradient(circle, rgba(137,233,119,1) 0%, rgba(28,120,66,1) 100%)'];
        return colorCircle;
    }

    /**
     * Fonction pour créer un cercle
     * 
     * @param {number} i
     * 
     * @returns {void}
     */
    createCircle(i) {
        let colorCircle = this.getColor();
        let circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = this.width + 'px';
        circle.style.height = this.width + 'px';
        circle.style.background = colorCircle[i % colorCircle.length];        
        circle.style.top = this.top + 'px';
        circle.style.left = this.left + 'px';
        circle.style.transform = 'scale(0)';
        document.querySelector('.circleContainer').appendChild(circle);
        setTimeout(function() {
            circle.style.opacity = 1;
            circle.style.transform = 'scale(1)';
        }, 100);
    }
}

/**
 * Fonction pour avoir les tailles de la fenêtre
 * 
 * @returns {Object} { maxWidth, clientWidth, clientHeight }
 */
function getSizes(){
    if (document.querySelector('#calendar')) {
        var heightCalendar = document.querySelector('#calendar').clientHeight;
    } else if (document.querySelector('.containerError')) {
        var heightCalendar = document.querySelector('.containerError').clientHeight + 300;
    } else if (document.querySelector('.containerLogout')) {
        var heightCalendar = document.querySelector('.containerLogout').clientHeight + 300;
    } else if (document.querySelector('.containerLogin')) {
        var heightCalendar = document.querySelector('.containerLogin').clientHeight + 300;
    }
    let circleContainer = document.querySelector('.circleContainer');
    circleContainer.style.height = heightCalendar + 'px';
    
    let clientWidth = document.querySelector('.circleContainer').clientWidth;
    let clientHeight = document.querySelector('.circleContainer').clientHeight;
    
    window.onresize = function() {
        clientWidth = document.querySelector('.circleContainer').clientWidth;
        clientHeight = document.querySelector('.circleContainer').clientHeight;
    }

    return { maxWidth : clientWidth * 0.5, clientWidth : clientWidth, clientHeight : clientHeight };
}

let nbCircle = 3;
sizes = getSizes();

for (let i = 0; i < nbCircle; i++) {
    let tmp_width = Math.floor(Math.random() * sizes.maxWidth);
    let width = tmp_width > 0 ? tmp_width : tmp_width * -1;
    width = width > 0.3 * sizes.clientWidth ? width : 0.3 * sizes.clientWidth;

    tmp_left = Math.floor(Math.random() * (sizes.clientWidth - width));
    let left = tmp_left > 0 ? tmp_left : tmp_left * -1;
    tmp_top = Math.floor(Math.random() * (sizes.clientHeight - width));
    let top = tmp_top > 0 ? tmp_top : tmp_top * -1;

    let circle = new Circle(width, left, top); 
    const getColor = circle.getColor.bind(circle);
    const createCircle = circle.createCircle.bind(circle);

    circle.createCircle(i);
}
