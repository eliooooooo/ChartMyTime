// import de Pristine
import Pristine from 'pristinejs';

window.onload = function () {

    // Toggle input to show password
    if (document.querySelectorAll('.showPassword')) {
        let showPasswordCheckbox = document.querySelectorAll('.showPassword');

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
    };

    // Toggle register/login step with tabulation and enter
    if (document.querySelectorAll('.toggleStep')) {
        const link = document.querySelectorAll('.toggleStep');

        link.forEach(element => {
            element.addEventListener('keydown', function(e){        
                if (e.key === 'Enter') {
                    element.click();
                }
            });
        });
    };

    var config = {
        classTo: 'form-group',
        errorClass: 'has-danger',
        successClass: 'has-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'text-help'
    };

    let formLogin = document.getElementById("loginForm");
    let formRegister = document.getElementById("registerForm");

    // Front validation for login and register forms
    if (formLogin && formRegister) {
        let pristine = new Pristine(formLogin);
        let pristine2 = new Pristine(formRegister, config);

        const password = formRegister.querySelector('#password');

        if (password && formRegister) {
            const pristine = new Pristine(formRegister);
            const formgroupPassword = document.querySelector(".formgroupPassword");
            password.addEventListener("input", function(e){
                if (formgroupPassword.classList.contains("has-danger")){
                    if (password.value === "") {
                        errorPassword.classList.add("hidden");
                        errorPassword.classList.remove("text-help");
                    } else {
                        const errorPassword = document.querySelector("#errorPassword");
            
                        errorPassword.classList.remove("hidden");
                        errorPassword.classList.add("text-help");
                    }
                } else {
                    errorPassword.classList.remove("text-help");
                    errorPassword.classList.add("hidden");
                }
            });

            pristine.addValidator(password, function(value) {
                return value.length >= 8;
            }, "<span class='ml-4'>- At least 8 characters</span>", 2);

            pristine.addValidator(password, function(value) {
                return /[a-z]/.test(value);
            }, "<span class='ml-4'>- At least one lowercase letter</span>", 2);

            pristine.addValidator(password, function(value) {
                return /[A-Z]/.test(value);
            }, "<span class='ml-4'>- At least one uppercase letter</span>", 2);

            pristine.addValidator(password, function(value) {
                return /\d/.test(value);
            }, "<span class='ml-4'>- At least one digit</span>", 2);
        }
    
        formLogin.addEventListener('submit', function (e) {
        var valid = pristine.validate();
        if (!valid) {
            e.preventDefault();
        }
        });

        formRegister.addEventListener('submit', function (e) {
            var valid = pristine2.validate();
            if (!valid) {
                e.preventDefault(); 
            }
        });
    };

    let updatePassword = document.getElementById("updatePassword");

    // Front validation for update password form
    if (updatePassword) {
        const password = updatePassword.querySelector('#newPassword');
        let pristine;

        if (password && updatePassword) {
            pristine = new Pristine(updatePassword, config);
            const formgroupPassword = document.querySelector(".formgroupPassword");
            password.addEventListener("input", function(e){
                console.log(formgroupPassword);
                if (formgroupPassword.classList.contains("has-danger")){
                    if (password.value === "") {
                        errorPassword.classList.add("hidden");
                        errorPassword.classList.remove("text-help");
                    } else {
                        console.log("toogle");
                        const errorPassword = document.querySelector("#errorPassword");
            
                        errorPassword.classList.remove("hidden");
                        errorPassword.classList.add("text-help");
                    }
                } else {
                    errorPassword.classList.remove("text-help");
                    errorPassword.classList.add("hidden");
                }
            });

            pristine.addValidator(password, function(value) {
                return value.length >= 8;
            }, "<span class='ml-4'>- At least 8 characters</span>", 2);

            pristine.addValidator(password, function(value) {
                return /[a-z]/.test(value);
            }, "<span class='ml-4'>- At least one lowercase letter</span>", 2);

            pristine.addValidator(password, function(value) {
                return /[A-Z]/.test(value);
            }, "<span class='ml-4'>- At least one uppercase letter</span>", 2);

            pristine.addValidator(password, function(value) {
                return /\d/.test(value);
            }, "<span class='ml-4'>- At least one digit</span>", 2);
        }

        updatePassword.addEventListener('submit', function (e) {
            var valid = pristine.validate();
            if (!valid) {
                e.preventDefault();
            }
        });
    }
};