import Popup from './popup.js';
import { Gamemaker, Reason } from './game.js';

const game = new Gamemaker()
    .putTime(5)
    .putPersonCount(5)
    .putVillainCount(5)
    .gameMake();

game.setFinish((reason) => {
    let text;
    switch (reason) {
        case Reason.stop:
            text="Retry?"
            break;
        case Reason.win:
            text = "you won😎😎";
            break;
        case Reason.lose:
        case Reason.timeover:
            if (reason == "lose") {
                text="You lost😥😥"
            } else {
                text="Time out🤪🤪"
            }
            break;
        default:
            throw new Error("Put the wrong reason");
    }
    gameFinishBanner.showWithText(text);
})

const gameFinishBanner = new Popup;
gameFinishBanner.clickListener(() => {
    game.init();
})


game.init();


