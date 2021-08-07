const VILLAIN__Size = 50;
import * as sound from './music.js';

export default class Field{
    constructor(personCount,villainCount) {
        this.PERSON__Count = personCount;
        this.VILLAIN__Count = villainCount;
        this.gameField = document.querySelector(".game__field");
        this.gameField.addEventListener('click', this.onFieldClick);
    }

    onFieldClick = (event) => {
        sound.playShot();
        const target = event.target;
            if (!target.matches(".villain") && !target.matches(".person")) {
                return;
            }
            if(target.matches(".villain")){
                target.remove();
                this.onclick("villain");
            } else if (target.matches(".person")) {
                this.onclick("person");
            }
    }

    setClick(onclick) {
        this.onclick = onclick;
    }

    addItems(num, className, url) {
        const xMax =this.gameField.getBoundingClientRect().width;
        const yMax =this.gameField.getBoundingClientRect().height;
        for (let i = 0; i < num; i++){
            const x = getRandNum(xMax-VILLAIN__Size);
            const y = getRandNum(yMax-VILLAIN__Size);
            const item = document.createElement("img");
            item.setAttribute("class", className);
            item.setAttribute("src", url);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.gameField.appendChild(item);
        }
    }
}

function getRandNum(num) {
    return Math.random() * num;
}