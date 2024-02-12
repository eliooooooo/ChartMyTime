document.addEventListener('DOMContentLoaded', (event) => {
    let workspaceForm = document.querySelector('#newWorkspace');
    let submitButton = workspaceForm.querySelector('.submitWorkspace');

    submitButton.addEventListener('click', function(event) {
        workspaceForm.submit();
    });
});
