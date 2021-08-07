import Field from './field.js';
import * as sound from './music.js';

export const Reason = Object.freeze({
    stop: "stop",
    win: "win",
    lose: "lose",
    timeover:"timeover"
})

export class Gamemaker {
    putTime(time) {
        this.gameTime = time;
        return this
    }
    putPersonCount(num) {
        this.personCount = num;
        return this
    }
    putVillainCount(num) {
        this.villainCount = num;
        return this
    }
    gameMake() {
        return new Game(
            this.gameTime,
            this.personCount,
            this.villainCount
        )
    }
}

class Game{
    constructor(gametime,personCount,villainCount) {
        this.gameTime = gametime;
        this.PERSON__Count = personCount;
        this.VILLAIN__Count = villainCount;
        this.lifeBar = document.querySelector(".game__life-bar");
        this.gameBtn = document.querySelector(".game__btn");
        this.gameBtn.addEventListener("click", this.onClickGameBtn);
        this.gameScore = document.querySelector(".game__score");
        this.gameTimer = document.querySelector(".game__timer");
        this.gameField = new Field(this.PERSON__Count, this.VILLAIN__Count);
        this.gameField.setClick(item => {
            if (item == "villain") {
                this.score++;
                this.updateScore();
                if (this.score == this.VILLAIN__Count) {
                    this.finish(Reason.win);
                }
            } else if (item == "person") {
                this.finish(Reason.lose);
            }
        })
        
        this.started = true;
        this.timer = undefined;
        this.score = 0;
    }

    setFinish(onfn) {
        this.onFn = onfn;
    }

    onClickGameBtn=()=>{
        this.hideBtn();
        this.finish(Reason.stop);
        this.started = false;
    }

    
    init() {
        this.started = true;
        this.gameField.gameField.innerHTML = ``;
        this.score = 0;
        this.showBtn();
        sound.playBackground();
        this.updateScore();
        this.setTimer();
        this.gameField.addItems(this.VILLAIN__Count, "villain", "img/villain.png");
        this.gameField.addItems(this.PERSON__Count, "person", "img/person.png")
    }

    showBtn() {
        this.gameBtn.classList.remove("hide");
    }
    
    hideBtn() {
        this.gameBtn.classList.add("hide");
    } 
    
    updateScore() {
        this.gameScore.innerText = this.score;
    }
    
    setTimer() {
        let remaining = this.gameTime;
        this.updateTime(remaining);
        this.timer = setInterval(() => {
            this.updateTime(--remaining)
            if (remaining == 0) {
                this.finish(Reason.timeover);
            }
        },1000)
    }
    
    updateTime(time) {
        const min = Math.round(time/60);
        const sec = time % 60;
        this.gameTimer.innerText = `${min>=10? min: min+'0'}:${sec>=10? sec: '0'+sec}`;
    }
    
    stopTimer() {
        clearInterval(this.timer);
    }
    
    finish(reason) {
        sound.pauseBackground();
        this.stopTimer();
        this.onFn(reason);
        }
}