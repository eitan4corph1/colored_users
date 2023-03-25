
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


console.log("start 1");

const userColor_DB = "user_colors_db";
const userColor_DB_backup = "user_colors_db_backup";

let user_colors = new Map();
read_db();


async function read_db(use_backup = false) {
    let db_name = use_backup ? userColor_DB_backup : userColor_DB;
    console.log("read_db: ", db_name);
    const response = await chrome.storage.local.get([db_name]);
    console.log("read_db get", response);
    let user_colors_loaded = new Map(JSON.parse(response[db_name]));
    console.log("read_db Loaded: ", user_colors_loaded);
    user_colors = user_colors_loaded;
    color_all_users();
}


async function save_db(use_backup = false) {
    let db_name = use_backup ? userColor_DB_backup : userColor_DB;
    console.log("save_db: ", db_name, user_colors);
    await chrome.storage.local.set({ [db_name]: JSON.stringify(Array.from(user_colors.entries())) });
    console.log("save_db finished: ", db_name);
}


function color_user(element, user) {
    if (user_colors.has(user)) {
        element.style.color = user_colors.get(user);
    }
}

function color_all_users() {
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
                    //console.log("id/user: ", user_id, ": ", user_name);
                    let font = td[td.length - 3].getElementsByTagName("font");
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
            //console.log("user name messgae: ", user);
            color_user(inputs[x], user);
        }
    }
}

async function restore() {
    await read_db(use_backup = true);
    save_db();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('from background script: ' + message)
    user = message[0];
    command = message[1];
    console.log('user: ' + user)
    console.log('command: ' + command)

    if (command == "backup") {
        save_db(use_backup = true);
        return;
    }
    if (command == "restore") {
        restore();
        return;
    }
    if (command == "reset") {
        user_colors = new Map();
        color_all_users();
        save_db();
        return;
    }

    if (command == "color_red") {
        user_color = "red"
    } else if (command == "color_blue") {
        user_color = "blue"
    }
    else if (command == "color_green") {
        user_color = "green"
    }

    user_colors.set(user, user_color);
    color_all_users();
    save_db();
});