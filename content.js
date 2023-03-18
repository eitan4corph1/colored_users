const article = document.querySelector("a");

console.log("start");



let tables = document.getElementsByTagName("TABLE");

console.log("tables tags: ", tables.length);

for (let x = 0; x < tables.length; x++) {
    let th = tables[x].getElementsByTagName("th");
    if (th.length == 4 && th[0].textContent.search("האשכול") >= 0) {
        let tr = tables[x].getElementsByTagName("tr");
        for (let y = 0; y < tr.length; y++) {
            let td = tr[y].getElementsByTagName("td");
            if (td.length >= 3) {
                user_id = td[td.length - 1].textContent;
                user_name = td[td.length - 3].textContent;
                console.log("id/user: ", user_id, ": ", user_name);
                let font = td[td.length - 3].getElementsByTagName("font");
                font[0].style.color = "red";
            }
        }
    }
}


let inputs = document.getElementsByTagName("a");

console.log("a tags: ", inputs.length);

for (let x = 0; x < inputs.length; x++) {
    let myname = inputs[x].getAttribute("name");
    if (myname && !isNaN(myname)) {
        let user = inputs[x].textContent;
        console.log("user name messgae: ", user);
        inputs[x].style.color = "red";
    }
}

