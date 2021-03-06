import InputHandler from "./InputHandler";
import GameObject from "./GameObject";
import Snake from "./Snake";
import Level from "./Level";
import Level1 from "./Levels/Level1";
import EatableBrick from "./EatableBrick";

const STATE_PLAYING = 'PLAYING'
const STATE_PAUSED = 'PAUSED'
const STATE_OVER = 'OVER'

export default class Game {
    private gameCanvasElement: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private width: number
    private height: number
    public objects: Array<GameObject>
    private frame: number
    private state: string
    public level: Level

    constructor(gameScreen: HTMLCanvasElement, width: number, height: number) {
        this.gameCanvasElement = gameScreen
        this.ctx = gameScreen.getContext('2d')
        this.width = width
        this.height = height

        this.ctx.canvas.width  = this.width
        this.ctx.canvas.height = this.height

        this.objects = []
        this.frame = 0
        this.state = STATE_PLAYING
        new InputHandler(this)
    }

    public canvas(): HTMLCanvasElement {
        return this.gameCanvasElement
    }

    public context(): CanvasRenderingContext2D {
        return this.ctx
    }

    public w(): number {
        return this.width
    }

    public h(): number {
        return this.height
    }

    public start(): void {
        this.state = STATE_PLAYING

        new InputHandler(this)

        this.level = new Level1()
        this.objects.push(new Snake(this, 0 ,0))
    }

    public loop(): void {
        this.frame++
        switch(this.currentState()) {
            case STATE_PLAYING:
                this.play()
                break
        }
    }

    private play(): void {
        this.context().clearRect(0 ,0, this.width, this.height)

        this.eatableBrick()

        this.objects.forEach(function(object) {
            object.draw()
            object.update()
        })
    }

    public eatableBrick(): void {
        let filter = this.objects.filter(function(object) {
            return object instanceof EatableBrick
        })

        if(filter.length == 0) {
            let x = Math.floor(Math.random() * this.w())
            let y = Math.floor(Math.random() * this.h())
            x = x + (50 - x % 50)
            y = y + (50 - y % 50)
            this.objects.push(new EatableBrick(this, x, y))
        }
    }

    public over(): void {
        this.state = STATE_OVER
        this.context().save()
        this.context().fillStyle = "#000"
        this.context().font = "50px Arial"
        this.context().textAlign = 'center'
        this.context().fillText('GAME OVER', this.width / 2, this.height / 2)
        this.context().restore()
    }

    public currentFrame() {
        return this.frame
    }

    public currentState(): string {
        return this.state
    }

    public togglePlayPause(): void {
        if(this.state == STATE_PLAYING) {
            this.state = STATE_PAUSED
        }
        else {
            this.state = STATE_PLAYING
        }
    }

}