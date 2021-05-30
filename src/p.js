const horizontal = document.querySelector(".main__horizontal");
const vertical = document.querySelector(".main__vertical");
const targetting = document.querySelector(".main__targetting");

const main = document.querySelector(".main");
const gameField = document.querySelector(".game-field");

gameField.addEventListener("mousemove", event => {
    const x = event.clientX;
    const y = event.clientY;
    console.log(x);
})
