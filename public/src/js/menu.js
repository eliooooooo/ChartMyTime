document.addEventListener("DOMContentLoaded", function() {
    const menus = document.querySelectorAll('.menuList');
    let linkList = [];
    menus.forEach(element => {
        let child = element.childNodes;
        child.forEach(element => {
            if (element.tagName == "LI") {
                if (element.childNodes[0].tagName == "A") {
                    linkList.push(element.childNodes[0]);
                }
                // if (element.tagName == "UL") {
                //     let grandChild = element.childNodes;
                //     console.log(grandChild);
                //     grandChild.forEach(element => {
                //         if (element.tagName == "LI") {
                //             if (element.childNodes[0].tagName == "A") {
                //                 linkList.push(element.childNodes[0]);
                //             }
                //         }
                //     });
                // }
            }
        });
    });
    console.log(linkList);

    let params = new URLSearchParams(window.location.search);
    let url = window.location.href;
    let lastSegment = url.split('/').pop();
    let page = lastSegment.split('?')[0];
    // console.log(page);
    let id = params.get('id');




    
});