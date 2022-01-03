import GameObject from "./GameObject";
import Game from "./Game";
export default class Snake extends GameObject {
    protected game: Game
    protected color: string
    public speed: number
    public currentSpeed: number
    public xDirection: number
    public yDirection: number

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = 50
        this.height = 50
        this.speed = this.game.level.getSpeed()
        this.currentSpeed = 0
        this.xDirection = 0
        this.yDirection = 0

        let red = Math.random() * 255
        let green = Math.random() * 255
        let blue = Math.random() * 255

        this.color = `rgb(${red}, ${green}, ${blue})`
    }

    draw() {
        super.draw()
        this.game.context().save()
        this.game.context().strokeStyle = '2px solid #000'
        this.game.context().fillStyle = this.color
        this.game.context().fillRect(this.x, this.y, this.width, this.height)
        this.game.context().strokeRect(this.x, this.y, this.width, this.height)
        this.game.context().restore()
    }

    update() {
        super.update();
        this.x += this.xDirection * this.currentSpeed
        this.y += this.yDirection * this.currentSpeed
        if(this.x > this.game.w()) {
            this.x = 0
        }
        if(this.x < 0) {
            this.x = this.game.w()
        }

        if(this.y > this.game.h()) {
            this.y = 0
        }
        if(this.y < 0) {
            this.y = this.game.h()
        }
    }
}
