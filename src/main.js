const opening = document.querySelector(".opening");
const start = document.querySelector(".start");
const startBtn = document.querySelector(".start-btn");

const horizontal = document.querySelector(".game-field__horizontal");
const vertical = document.querySelector(".game-field__vertical");
const targetting = document.querySelector(".game-field__targetting");

const gameField = document.querySelector(".game-field");
const gameFieldRec = gameField.getBoundingClientRect();
const gameMain = document.querySelector(".game-main");

const NUMBER_VILLAIN = 2;
const GAME_DURATION = 3;

let started = false;
let timer = undefined;
let itemCreater = undefined;

function startOpening() {
    setTimeout(() => {
        const circle = document.createElement("div");
        circle.setAttribute("class", "opening__circle");
        const img = document.createElement("img");
        img.setAttribute("class", "opening__img");
        img.setAttribute("src", "img/opening.png");
        opening.appendChild(circle);
        opening.appendChild(img);
        setTimeout(() => {
            opening.remove();
            start.style.display = `flex`;
        },12000)
    },1000)
}


function onStartBtn() {
    setTimeout(() => {
        start.remove();
        gameMain.style.display = `flex`;
        initGame();
    }, 1000);   
}

function initGame(){
    addItem("villain","img/villain.png");
}

function addItem(className,url) {
    let number = 0;
    itemCreater = setInterval(() => {
        if (number === NUMBER_VILLAIN) {
            clearInterval(itemCreater);
        }
        const x = randomNum(800);
        const y = randomNum(700);
        const image = document.createElement("img");
        image.setAttribute("src", url);
        image.setAttribute("class", className);
        image.style.transform=`translate(${x}px,${y}px)`
        gameField.appendChild(image);
        number++;
    }, 1000);
}

function randomNum(num) {
    return Math.random() * num;
}

startOpening();
startBtn.addEventListener("click", onStartBtn);
gameField.addEventListener("mousemove", event => {
    const targettingRec = targetting.getBoundingClientRect();
    const targgettingRecWidth = targettingRec.width / 2;
    const targettingRecHeight = targettingRec.height / 2;
    const startPointX = gameFieldRec.left;
    const startPointY = gameFieldRec.top;
    const x = event.clientX;
    const y = event.clientY;
    horizontal.style.transform = `translateY(${y - startPointY}px)`;
    vertical.style.transform = `translateX(${x - startPointX}px)`;
    targetting.style.transform = `translate(${x - startPointX - targgettingRecWidth}px,${y - startPointY - targettingRecHeight}px)`;
});

