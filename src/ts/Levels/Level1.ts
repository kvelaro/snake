import Level from "../Level";

export default class Level1 extends Level {
    protected speed: number
    protected bricks: number

    constructor() {
        super()
        this.speed = 5
        this.bricks = 0
    }
}