import GameObject from "./GameObject";
import Game from "./Game";
import Collision from "./Collision";
import EatableBrick from "./EatableBrick";
export default class Snake extends GameObject {
    protected game: Game
    protected color: string
    public speed: number
    public currentSpeed: number
    public xRequestedDirection: number
    public yRequestedDirection: number
    protected xDirection: number
    protected yDirection: number
    public turnPending: boolean
    protected collisionDetected: boolean

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = 50
        this.height = 50
        this.speed = this.game.level.getSpeed()
        this.currentSpeed = 0
        this.xRequestedDirection = 0
        this.yRequestedDirection = 0
        this.xDirection = 0
        this.yDirection = 0
        this.turnPending = false
        this.collisionDetected = false

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
        if(this.turnPending && this.x % 50 == 0 && this.y % 50 == 0) {
            this.xDirection = this.xRequestedDirection
            this.yDirection = this.yRequestedDirection
            this.turnPending = false
        }
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

        let eatableBrickIndex = -1
        for(let i = 0; i < this.game.objects.length; i++) {
            if(this.game.objects[i] instanceof EatableBrick) {
                eatableBrickIndex = i
            }
        }

        if(this.collisionDetected && !Collision(this, this.game.objects[eatableBrickIndex])) {
            this.collisionDetected = false
            this.game.objects.splice(eatableBrickIndex, 1)
            this.game.eatableBrick()
        }
        else if(Collision(this, this.game.objects[eatableBrickIndex])) {
            this.collisionDetected = true
        }


    }
}
