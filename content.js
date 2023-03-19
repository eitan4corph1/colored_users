
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


console.log("start 1");

const userColor_DB = "user_colors_db";


let user_colors = new Map();
user_colors.set("pedro", "red");
user_colors.set("צ'מפי", "blue");
user_colors.set("Compoti", "green");
user_colors.set("Lucky", "blue");

console.log("Set: ", user_colors);

chrome.storage.local.set({ user_colors_db: JSON.stringify(Array.from(user_colors.entries())) });

let promise_get = chrome.storage.local.get(["user_colors_db"]);
promise_get.then(
    function (value) {
        console.log("get", value);
        let user_colors_loaded = new Map(JSON.parse(value.user_colors_db));
        console.log("Loaded: ", user_colors_loaded);
    },
    function (error) { console.log("get", error); }
);


function color_user(element, user) {
    if (user_colors.has(user)) {
        element.style.color = user_colors.get(user);
    }
}

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
                //font[0].style.color = "red";
                color_user(font[0], user_name);
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
        //inputs[x].style.color = "red";
        color_user(inputs[x], user);
    }
}

