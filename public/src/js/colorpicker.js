const colorPicker = document.getElementById("colorPicker");
const colorChoice = colorPicker.querySelectorAll(".colorChoice");

colorChoice.forEach(function(element) {
    element.addEventListener("click", function() {
        let selectedColor = this.getAttribute('data-value');
        document.getElementById('selectedColor').value = selectedColor;
        document.getElementById('colorPicker').submit();
    });
});