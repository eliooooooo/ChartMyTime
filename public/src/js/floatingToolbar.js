// console.log('floatingToolbar.js');

if (document.querySelectorAll(".inputMonthYear")) {
    let inputMonthYear = document.querySelector(".inputMonthYear");
    let toggle = document.querySelector(".togglesvg");
    if (toggle) {
        toggle.addEventListener("click", function() {
            if (inputMonthYear.classList.contains("active") == false) {
                inputMonthYear.classList.add("active");
            }
        });
    }
    let closeFormMonthYear = document.querySelector(".closeFormMonthYear");
    if (closeFormMonthYear) {
        closeFormMonthYear.addEventListener("click", function(event) {
            inputMonthYear.classList.remove("active");
            console.log("click");
            console.log(inputMonthYear.classList);
        });
    }
}