
chrome.commands.onCommand.addListener(command => {
    console.log("Command:", command);
});

///////////////


chrome.runtime.onInstalled.addListener(() => {
    let parent = chrome.contextMenus.create({
        id: "color_user",
        title: "ColorUsers",
        contexts: ["selection"]
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
        id: "colorgreen",
        title: "ColorGreen",
        parentId: parent,
        contexts: ["selection"]
    });        
});


chrome.contextMenus.onClicked.addListener(function (clickData) {
    console.log(clickData.menuItemId);
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log(info.menuItemId);
    console.log(info.selectionText);
    console.log(tab);
});