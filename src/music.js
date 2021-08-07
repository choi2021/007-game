const shot__sound = new Audio("music/shot.wav");
const background__sound = new Audio("music/background.mp3");
background__sound.volume = 0;
const success__sound = new Audio("music/success.wav");
const fail__sound = new Audio("music/fail.wav");
fail__sound.volume = 0.1;
const alert__sound = new Audio("music/alert.wav");

export function playShot() {
    shot__sound.play();
}

export function playBackground() {
    background__sound.play();
}

export function playSuccess() {
    success__sound.play();
}

export function playFail() {
    fail__sound.play();
}

export function playAlert() {
    alert__sound.play();
}

export function pauseBackground() {
    background__sound.pause();
}