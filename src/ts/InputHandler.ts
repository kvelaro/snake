import Game from "./Game";
import Snake from "./Snake";

export default class InputHandler {
    protected game: Game

    constructor(game: Game) {
        this.game = game
        let self = this
        document.addEventListener('keydown', function(e) {
            let tmp = self.game.objects.filter(function(object) { return object instanceof Snake })
            let snakeObj = <Snake>tmp.pop()
            snakeObj.currentSpeed = snakeObj.speed
            switch (e.code) {
                case 'ArrowUp':
                    snakeObj.xDirection = 0
                    snakeObj.yDirection = -1
                    break
                case 'ArrowDown':
                    snakeObj.xDirection = 0
                    snakeObj.yDirection = 1
                    break
                case 'ArrowLeft':
                    snakeObj.xDirection = -1
                    snakeObj.yDirection = 0
                    break
                case 'ArrowRight':
                    snakeObj.xDirection = 1
                    snakeObj.yDirection = 0
                    break
            }
        })
    }
}