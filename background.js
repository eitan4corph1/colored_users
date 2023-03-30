
var showForPages = ["https://rotter.net/forum/scoops1/*"];

chrome.runtime.onInstalled.addListener(() => {
    let parent = chrome.contextMenus.create({
        id: "color_user",
        title: "ColorUsers",
        contexts: ["selection"],
        documentUrlPatterns: showForPages
    });
    chrome.contextMenus.create({
        id: "color_red",
        title: "ColorRed",
        parentId: parent,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "color_blue",
        title: "ColorBlue",
        parentId: parent,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "color_green",
        title: "ColorGreen",
        parentId: parent,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "separator1",
        parentId: parent,
        type: "separator",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "backup",
        title: "Backup",
        parentId: parent,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "restore",
        title: "Restore",
        parentId: parent,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "separator2",
        parentId: parent,
        type: "separator",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "reset",
        title: "Reset",
        parentId: parent,
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info.menuItemId);
    console.log(info.selectionText);
    console.log(tab);
    chrome.tabs.sendMessage(tab.id, [info.selectionText, info.menuItemId]);
});