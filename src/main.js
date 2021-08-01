const lifeBar = document.querySelector(".game__life-bar");
const gameBtn = document.querySelector(".game__btn");
const gameScore = document.querySelector(".game__score");
const gameTimer = document.querySelector(".game__timer");
const gameField = document.querySelector(".game__field");

const popup = document.querySelector(".pop-up");
const popupBtn = document.querySelector(".pop-up__btn");
const popupText = document.querySelector(".pop-up__text");

const PERSON__Count = 5;
const VILLAIN__Count = 5;
const gameTime = 5;
const VILLAIN__Size = 50;

const shot__sound = new Audio("music/shot.wav");
const respond__sound = new Audio("music/장전소리.mp3");
const background__sound = new Audio("music/background.mp3");
const success__sound = new Audio("music/success.wav");
const fail__sound = new Audio("music/fail.wav");
fail__sound.volume = 0.1;
const alert__sound = new Audio("music/alert.wav");


let started = true;
let timer = undefined;
let score = 0;


initGame();

gameBtn.addEventListener("click", onClickGameBtn);

function onClickGameBtn() {
    pauseSound(background__sound);
    playSound(alert__sound);
    hideGameBtn();
    showPopupWithText("replay?");
    stopTimer();
    started = false;
}

gameField.addEventListener("click", event => {
    const target = event.target;
    playSound(shot__sound);
    if (!target.matches(".villain") && !target.matches(".person")) {
        return;
    }
    if(target.matches(".villain")){
        target.remove();
        score++;
        updateScore();
        if (score == VILLAIN__Count) {
            pauseSound(background__sound);
            playSound(success__sound);
            showPopupWithText("Mission Success👍👍");
            stopTimer();
        }
    } else if (target.matches(".person")) {
        pauseSound(background__sound);
        playSound(fail__sound);
        showPopupWithText("You Lost😥😥😥");
        stopTimer();
    }}
)

popupBtn.addEventListener("click", () => {
    hidePopup();
    initGame();
})

function showGameBtn() {
    gameBtn.classList.remove("hide");
}

function hideGameBtn() {
    gameBtn.classList.add("hide");
} 

function showPopupWithText(text) {
    popup.classList.remove("hide");
    popupText.innerText=text;
}

function hidePopup() {
    popup.classList.add("hide");
}


function initGame() {
    started = true;
    gameField.innerHTML = ``;
    score = 0;
    showGameBtn();
    playSound(background__sound);
    updateScore();
    setTimer();
    addItems(VILLAIN__Count, "villain", "img/villain.png");
    addItems(PERSON__Count, "person", "img/person.png")
}

function updateScore() {
    gameScore.innerText = score;
}

function setTimer() {
    let remaining = gameTime;
    updateTime(remaining);
    timer = setInterval(() => {
        updateTime(--remaining)
        if (remaining == 0) {
            stopTimer();
            pauseSound(background__sound);
            playSound(fail__sound);
            showPopupWithText("Time out🤪🤪");
        }
    },1000)
}

function updateTime(time) {
    const min = Math.round(time/60);
    const sec = time % 60;
    gameTimer.innerText = `${min>=10? min: min+'0'}:${sec>=10? sec: '0'+sec}`;
}

function addItems(num, className, url) {
    const xMax = gameField.getBoundingClientRect().width;
    const yMax = gameField.getBoundingClientRect().height;
    for (let i = 0; i < num; i++){
        const x = getRandNum(xMax-VILLAIN__Size);
        const y = getRandNum(yMax-VILLAIN__Size);
        const villain = document.createElement("img");
        villain.setAttribute("class", className);
        villain.setAttribute("src", url);
        villain.style.left = `${x}px`;
        villain.style.top = `${y}px`;
        gameField.appendChild(villain);
    }
}

function getRandNum(num) {
    return Math.random() * num;
}

function stopTimer() {
    clearInterval(timer);
}

function playSound(sound) {
    sound.play();
}

function pauseSound(sound) {
    sound.pause();
}