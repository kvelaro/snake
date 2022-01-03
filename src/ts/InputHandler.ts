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
            snakeObj.turnPending = true
            switch (e.code) {
                case 'ArrowUp':
                    snakeObj.xRequestedDirection = 0
                    snakeObj.yRequestedDirection = -1
                    break
                case 'ArrowDown':
                    snakeObj.xRequestedDirection = 0
                    snakeObj.yRequestedDirection = 1
                    break
                case 'ArrowLeft':
                    snakeObj.xRequestedDirection = -1
                    snakeObj.yRequestedDirection = 0
                    break
                case 'ArrowRight':
                    snakeObj.xRequestedDirection = 1
                    snakeObj.yRequestedDirection = 0
                    break
                case 'Escape':
                    self.game.togglePlayPause()
                    break
            }
        })
    }
}