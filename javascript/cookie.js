const perunitcost = 100;
var formatter = new Intl.NumberFormat()

let cookieLabel = document.querySelector(".point-label");
let button = document.querySelector(".click-button");
let upgradeList = document.querySelector(".upgrade-list");
let upgradebutton = document.querySelector(".buy-button");
let upgradeallbutton = document.querySelector(".buyall-button")
let autoClickButton = document.querySelector(".autoclicker-button")
let autoclickerList = document.querySelector(".autoclick-list")
let buyalltwobutton = document.querySelector(".buyalltwo-button")

button.addEventListener("click", addcookie);
upgradebutton.addEventListener("click", buyupgrade);
upgradeallbutton.addEventListener("click", allupgrade)
autoClickButton.addEventListener("click", autoclickerbuy)
buyalltwobutton.addEventListener("click", allupgradetwo)

let cookie = 0;
let scoreMultiplier = 1;
let autoclicker = 0;
let purchaseqt = 0;
let price = 0;

function buyupgrade() {
    if (cookie >= 100) {
        cookie -= 100;
        scoreMultiplier++;
        update();
    }
}

function autoclickerbuy(){
    if (cookie >= 100) {
        cookie -= 100;
        autoclicker++;
        update();
    }
}

function autoadder(){
    cookie += autoclicker;
    update();
}

function allupgrade(){
    purchaseqt = Math.floor(cookie / perunitcost);
    cookie -= perunitcost*purchaseqt;
    scoreMultiplier += purchaseqt;
    update();
}

function allupgradetwo(){
    purchaseqt = Math.floor(cookie / perunitcost);
    cookie -= perunitcost*purchaseqt;
    autoclicker += purchaseqt;
    update();
}

function updateList() {
    if (scoreMultiplier == 1){
        upgradeList.innerHTML = formatter.format(scoreMultiplier) + " cookie per click";
    }
    else{
        upgradeList.innerHTML = formatter.format(scoreMultiplier) + " cookies per click";
    }
    if (autoclicker == 1){
        autoclickerList.innerHTML = formatter.format(autoclicker) + " cookie per second"
    }
    else{
        autoclickerList.innerHTML = formatter.format(autoclicker) + " cookies per second"
    }
}

function addcookie() {
    cookie += scoreMultiplier;
    update();
}

function update() {
    updateList();
    cookieLabel.innerHTML = formatter.format(Math.floor(cookie));
}

update();

setInterval(autoadder, 1000)