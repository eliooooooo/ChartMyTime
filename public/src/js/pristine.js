// import de Pristine
import Pristine from 'pristinejs';

window.onload = function () {

    let showPasswordCheckbox = document.getElementsById('showPassword');
    let passwordInput = document.getElementById('password');
    let confirmPasswordInput = document.getElementById('confirm-password');

    showPasswordCheckbox.addEventListener('change', function () {
        if (showPasswordCheckbox.checked) {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
        }
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