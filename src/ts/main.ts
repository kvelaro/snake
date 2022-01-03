import Game from "./Game";

const GAME_WIDTH = window.innerWidth
const GAME_HEIGHT = window.innerHeight
const FPS = 1000 / 30

let prev: number = (new Date()).getTime()

let gameScreen = <HTMLCanvasElement>document.querySelector('#gameScreen')

let game = new Game(gameScreen, GAME_WIDTH, GAME_HEIGHT)
game.start()

function gameLoop() {
    let now = (new Date()).getTime()
    if(now - prev > FPS) {
        prev = now - (prev % FPS)
        game.loop()
    }
    requestAnimationFrame(gameLoop)
}
gameLoop()