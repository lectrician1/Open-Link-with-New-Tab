browser.storage.sync.get(["option", "excludeSites"], function (value) {
    var option = value.option;
    var excludeSites = value.excludeSites || [];
    if(option != 0) setBrank(option, excludeSites);
});

var url = window.location.href;

function setBrank(option, excludeSites) {
    var aTags = window.document.getElementsByTagName("a");
    for (let link of aTags) {
        if (link.href != "") {
            // Skip if link origin is in the exclusion list
            if (excludeSites.some(site => link.origin.indexOf(site) === 0)) continue;
            if (ifEqualSite(link)) { //同一サイトなら
                if (option == 2) link.target = "_blank";
            } else {
                link.target = "_blank";
            }
        }
    }
}

function ifEqualSite(link) {
    return link.origin == "null" || url.indexOf(link.origin) === 0; //ホスト名で判断
}
