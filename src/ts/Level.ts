export default class Level {
    protected speed: number
    protected bricks: number

    public getSpeed():number {
        return this.speed
    }

    public getBricks(): number {
        return this.bricks
    }
}