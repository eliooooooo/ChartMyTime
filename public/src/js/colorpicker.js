document.addEventListener('DOMContentLoaded', (event) => {
    const colorPicker = document.getElementById("colorPicker");
    const colorChoice = colorPicker.querySelectorAll(".colorChoice");
    
    colorChoice.forEach(function(element) {
        element.addEventListener("click", function() {
            let selectedColor = this.getAttribute('data-value');
            document.getElementById('selectedColor').value = selectedColor;
            document.getElementById('colorPicker').submit();
        });
    });

    const gearUser1 = document.getElementById("gearUser1");
    const gearUser2 = document.getElementById("gearUser2");
    const gearUserSelect = document.getElementsByClassName("gearUserSelect");

    Array.from(gearUserSelect).forEach(function(element) {
        element.addEventListener("click", function() {
            let selectedGear = this.getAttribute('data-value');
            if (selectedGear == "1") {
                document.getElementById('gearUser1').submit();
            } else if (selectedGear == "2") {
                document.getElementById('gearUser2').submit();
            }
        });
    });
});