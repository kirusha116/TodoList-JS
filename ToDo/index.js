let obj
const main = document.querySelector('.home-page main');
const addPageTitle = document.querySelector('.add-page main .Title');
const addPageDetail = document.querySelector('.add-page main .Detail');
const editPageTitle = document.querySelector('.edit-page main .Title');
const editPageDetail = document.querySelector('.edit-page main .Detail');
const add = document.querySelector('.home-page .add');
const allText = document.querySelector('.home-page footer .all figcaption');
const allSvg = document.querySelector('.home-page footer .all svg path');
const complText = document.querySelector('.home-page footer .completed figcaption');
const complSvg = document.querySelector('.home-page footer .completed svg path');


if("todo" in localStorage){
    obj = JSON.parse(localStorage.todo);
} else {
    obj = {};
}

function createBlock(completed){
    main.innerHTML = "";

    if (!completed){
        add.style.display = "flex"
        
        allText.style.color = "#9395D3";
        allSvg.style.fill = "#9395D3";
        complText.style.color = "#8B8787";
        complSvg.style.stroke = "#8B8787";
        main.style.marginBottom = "-91px";
        
        for (const key in obj) {
            blockData = obj[key]
            if(!(obj[key].completed)){
                let block = document.createElement('div');
                block.classList.add('block');
                block.innerHTML = 
                    `<div class="text">
                        <h2>${blockData.title}</h2>
                        <h3>${blockData.detail}</h3>
                    </div>
                    <div class="icons">
                        <img src="img/Pencil.svg" onclick="openEditPage(${key})">
                        <img src="img/Trash.svg" onclick="deleteBlock(${key})">
                        <img src="img/CheckCircle.svg" onclick="completion(${key})">
                    </div>`
                main.append(block);
            }
        }
    } else {
        add.style.display = "none"
        
        allText.style.color = "#8B8787";
        allSvg.style.fill = "#8B8787";
        complText.style.color = "#9395D3";
        complSvg.style.stroke = "#9395D3";
        main.style.marginBottom = "0px";

        for (const key in obj) {
            blockData = obj[key]
            if(obj[key].completed){
                let block = document.createElement('div');
                block.classList.add('block');
                block.innerHTML = 
                    `<div class="text">
                        <h2>${blockData.title}</h2>
                        <h3>${blockData.detail}</h3>
                    </div>
                    <div class="icons">
                        <img src="img/Trash.svg" onclick="deleteBlock(${key})">
                        <img src="img/Circle.svg" onclick="uncompletion(${key})">
                    </div>`
                main.append(block);
            }
        }
    }
}
createBlock(false);

function goHome(selector) {
    const page = document.querySelector(selector);
    page.style.left = "100%";
    const pageTitle = page.querySelector('main .Title');
    const pageDetail = page.querySelector('main .Detail');
    setTimeout(() => {
        pageTitle.value = "";
        pageDetail.value = "";
    }, 500);
}

function addBlock() {
    if (!addPageTitle.value && !addPageDetail.value){return}
    obj[Date.now()] = new function() {
        this.title = addPageTitle.value;
        this.detail = addPageDetail.value;
        this.completed = false;
    }
    main.innerHTML = "";
    createBlock(false);
    goHome('.add-page');
    localStorage.todo = JSON.stringify(obj);
}

function deleteBlock(key) {
    if(!obj[key].completed){
        delete obj[key];
        createBlock(false);
    } else {
        delete obj[key];
        createBlock(true);
    }
    localStorage.todo = JSON.stringify(obj);
}

function openPage(selector) {
    const page = document.querySelector(selector);
    page.style.left = '0%'
}

function openEditPage(key) {
    editPageTitle.id = key;
    editPageTitle.value = obj[key].title;
    editPageDetail.value = obj[key].detail; 
    openPage('.edit-page');
}

function update() {
    key = editPageTitle.id
    obj[key].title = editPageTitle.value;
    obj[key].detail = editPageDetail.value;
    main.innerHTML = "";
    createBlock(false);
    goHome('.edit-page');
    localStorage.todo = JSON.stringify(obj);
}

function completion(key){
    obj[key].completed = true;
    createBlock(false);
    localStorage.todo = JSON.stringify(obj);
}

function uncompletion(key){
    obj[key].completed = false;
    createBlock(true);
    localStorage.todo = JSON.stringify(obj);
}