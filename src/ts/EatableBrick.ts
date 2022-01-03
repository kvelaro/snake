import Game from "./Game";
import Brick from "./Brick";

export default class EatableBrick extends Brick {
    protected game: Game
    protected color: string

    constructor(game: Game, x: number, y: number) {
        super(x, y)
        this.game = game
        this.width = 50
        this.height = 50

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
    }
}
