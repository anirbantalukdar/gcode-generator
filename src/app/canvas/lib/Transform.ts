export class Transform {
    protected dx: number;
    protected dy: number;
    protected s: number;

    constructor(){
        this.dx = 0;
        this.dy = 0;
        this.s = 1;
    }

    scaleBy(s: number){
        this.s *= 1/s;
        this.dx *= 1/s;
        this.dy *= 1/s;
    }

    translateBy(dx: number, dy: number){
        this.dx -= dx;
        this.dy -= dy;
    }

    transformBy(x: number, y: number){
        return {
            x: this.dx + this.s * x,
            y: this.dy + this.s * y
        };
    }
}