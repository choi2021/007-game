const opening = document.querySelector(".opening");
const openingImg = document.querySelector(".opening-img");
const bgSound = new Audio("music/James bond theme.mp3");
bgSound.play();
setTimeout(() => {
    openingImg.classList.remove("hide");
}, 4400)

setTimeout(() => {
    openingImg.remove();
}, 9500)

setTimeout(() => {
    opening.remove();
}, 10000)