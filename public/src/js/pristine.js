// import de Pristine
import Pristine from 'pristinejs';

window.onload = function () {

    let showPasswordCheckbox = document.querySelectorAll('#showPassword');

    showPasswordCheckbox.forEach(element => {
        element.addEventListener('change', function () {
            if (element.checked) {
                let input = element.previousElementSibling;
                input.type = 'text';
            } else {
                let input = element.previousElementSibling;
                input.type = 'password';
            }
        });
    });

    let formLogin = document.getElementById("loginForm");

    var config = {
        classTo: 'form-group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
    };
 
    let pristine = new Pristine(formLogin);
 
    formLogin.addEventListener('submit', function (e) {
       var valid = pristine.validate();
       if (!valid) {
           e.preventDefault(); // Empêche la soumission du formulaire si la validation échoue
       }
    });
};