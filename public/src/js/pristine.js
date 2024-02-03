// import de Pristine
import Pristine from 'pristinejs';

window.onload = function () {

    let showPasswordCheckbox = document.querySelectorAll('#showPassword');

    showPasswordCheckbox.forEach(element => {
        element.addEventListener('change', function () {
            let input = element.previousElementSibling.querySelector('input');
            if (element.checked) {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
    
    let formLogin = document.getElementById("loginForm");
    let formRegister = document.getElementById("registerForm");

    var config = {
        classTo: 'form-group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
    };
 
    let pristine = new Pristine(formLogin);
    let pristine2 = new Pristine(formRegister, config);
 
    formLogin.addEventListener('submit', function (e) {
       var valid = pristine.validate();
       if (!valid) {
           e.preventDefault(); // Empêche la soumission du formulaire si la validation échoue
       }
    });

    formRegister.addEventListener('submit', function (e) {
        var valid = pristine2.validate();
        if (!valid) {
            e.preventDefault(); // Empêche la soumission du formulaire si la validation échoue
        }
     });
};