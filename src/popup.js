export default class Popup{
    constructor(){
        this.popup = document.querySelector(".pop-up");
        this.popupBtn = document.querySelector(".pop-up__btn");
        this.popupText = document.querySelector(".pop-up__text"); 
        this.popupBtn.addEventListener("click", ()=>{
            this.hide();
            this.onclick && this.onclick();
        })
    }

    clickListener(onclick) {
        this.onclick = onclick;
    }
    
    showWithText(text) {
        this.popup.classList.remove("hide");
        this.popupText.innerText=text;
    }

    hide() {
        this.popup.classList.add("hide");
    }

}