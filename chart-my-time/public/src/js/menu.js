document.addEventListener('DOMContentLoaded', (event) => {
    let navLinks = document.querySelectorAll('a');
    let currentUrl = window.location.href;

    navLinks.forEach((link) => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        } else if (currentUrl.includes('delete')){
            let home = document.querySelectorAll('#home');
            home.forEach(element => {
                element.classList.add('active');
            });
        } else if (currentUrl.includes('create')) {
            let workspaceList = document.querySelectorAll('#workspaceList');
            let target = [];

            workspaceList.forEach(element => {
                if (element.children.length > 1) {
                    target.push(element.children[element.children.length - 2]);
                }
            });

            target.forEach(element => {
                element.classList.add('active');
            });
            
            console.log(target);
        }
    });
});