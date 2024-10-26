document.addEventListener("DOMContentLoaded", (event) => {
    let submitButton = document.querySelectorAll(".submitWorkspace");
    submitButton.forEach(element => {
        element.addEventListener("click", function(event2) {
            let workspaceForm = submitButton.parentNode;
            workspaceForm.submit();
        });
    });
});