//ラベルセット
for(let l of ["optionLabel", "optionLabel0", "optionLabel1", "optionLabel2"]){
    document.getElementById(l).innerHTML = browser.i18n.getMessage(l);
}

// Helper to create a list item with remove button
function createListItem(site) {
    const li = document.createElement("li");
    li.textContent = site + " ";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function(){
        browser.storage.sync.get("excludeSites", function(value){
            const excludes = value.excludeSites || [];
            const index = excludes.indexOf(site);
            if (index > -1) {
                excludes.splice(index, 1);
                browser.storage.sync.set({excludeSites: excludes}, function(){
                    li.remove();
                });
            }
        });
    });
    li.appendChild(removeBtn);
    return li;
}

option = window.document.getElementsByName("option");
//初期値セット
browser.storage.sync.get(["option", "excludeSites"], function(value){
    option[value.option].checked = true;
    // Initialize exclusion list UI
    const excludes = value.excludeSites || [];
    const ul = document.getElementById("excludeList");
    ul.innerHTML = "";
    excludes.forEach(site => {
        ul.appendChild(createListItem(site));
    });
})

window.document.addEventListener("click", function(e){
    switch(e.target.tagName){
        case 'INPUT':
            save(e.target.value);
            break;
    }
})

// Save radio option
function save(value){
    browser.storage.sync.set({
        'option': value
    });
}

// Exclusion list handling
document.getElementById("addExclude").addEventListener("click", function(){
    const input = document.getElementById("excludeInput");
    const newSite = input.value.trim();
    if(newSite){
        browser.storage.sync.get("excludeSites", function(value){
            const excludes = value.excludeSites || [];
            if(!excludes.includes(newSite)){
                excludes.push(newSite);
                browser.storage.sync.set({excludeSites: excludes}, function(){
                    // Update UI
                    const ul = document.getElementById("excludeList");
                    ul.appendChild(createListItem(newSite));
                    input.value = "";
                });
            }
        });
    }
});