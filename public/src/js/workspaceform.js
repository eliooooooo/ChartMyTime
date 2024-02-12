// document.addEventListener('DOMContentLoaded', (event) => {
//     let workspaceForm = document.querySelector('#newWorkspace');
//     let submitButton = workspaceForm.querySelector('.submitWorkspace');

//     submitButton.addEventListener('click', function(event) {
//         workspaceForm.submit();
//     });
// });

document.addEventListener("DOMContentLoaded", (event) => {
    let submitButton = document.querySelectorAll(".submitWorkspace");
    submitButton.forEach(element => {
        element.addEventListener("click", function(event2) {
            let workspaceForm = submitButton.parentNode;
            workspaceForm.submit();
        });
    });
});