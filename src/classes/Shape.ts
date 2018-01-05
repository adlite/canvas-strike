import {App} from "./App";
import {Direction} from "../enums";

export abstract class Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    stroke: string = '#ccc';
    fill: string = '#464646';
    opacity: number = 1;
    lineWidth: number = 1;
    lineCap: string = 'butt';

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //check if this shape is colliding with other
    hit(shape: Shape): boolean {
        //this angle points
        let ax1 = this.x;
        let ax2 = this.x + this.width;
        let ay1 = this.y;
        let ay2 = this.y + this.height;
        //other shape angle points
        let bx1 = shape.x;
        let bx2 = shape.x + shape.width;
        let by1 = shape.y;
        let by2 = shape.y + shape.height;

        let hitHoriz = false;
        let hitVert = false;

        if ((bx1 >= ax1 && bx1 <= ax2) || (bx2 >= ax1 && bx2 <= ax2)) {
            hitHoriz = true;
        }
        if ((by1 >= ay1 && by1 <= ay2) || (by2 >= ay1 && by2 <= ay2)) {
            hitVert = true;
        }

        return hitVert && hitHoriz;
    }

    //render shape rect borders for debug purposes
    renderShapeRect(): void {
        //set debug styles
        App.ctx.strokeStyle = 'red';
        App.ctx.globalAlpha = 1;
        App.ctx.lineWidth = 1;
        App.ctx.lineCap = 'butt';
        //render shape
        App.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    render(): void {
        App.ctx.strokeStyle = this.stroke;
        App.ctx.fillStyle = this.fill;
        App.ctx.globalAlpha = this.opacity;
        App.ctx.lineWidth = this.lineWidth;
        App.ctx.lineCap = this.lineCap;
    }
}

export abstract class ActiveShape extends Shape {
    vx: number = 1; //velocity x
    vy: number = 1; //velocity y
    ax: number = 1; //acceleration x
    ay: number = 1; //acceleration y
    dirX: Direction = Direction.RIGHT;
    dirY: Direction = Direction.UP;
    isMovingX: boolean = false;
    isMovingY: boolean = false;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    moveX(dir: Direction) {
        this.isMovingX = true;
        this.dirX = dir;
    }

    moveY(dir: Direction) {
        this.isMovingY = true;
        this.dirY = dir;
    }

    stop() {
        this.isMovingX = false;
        this.isMovingY = false;
    }

    stopX() {
        this.isMovingX = false;
    }

    stopY() {
        this.isMovingY = false;
    }

    //set next moving values before render
    protected setMoving() {
        if (this.isMovingX) {
            this.vx *= this.ax; //set x acceleration
            if (this.dirX === Direction.LEFT) {
                this.x -= this.vx;
            } else if (this.dirX === Direction.RIGHT) {
                this.x += this.vx;
            }
        }

        if (this.isMovingY) {
            this.vy *= this.ay; //set y acceleration
            if (this.dirY === Direction.UP) {
                this.y -= this.vy;
            } else if (this.dirY === Direction.DOWN) {
                this.y += this.vy;
            }
        }
    }

    //reset next moving values before render
    protected resetMoving() {
        if (this.isMovingX) {
            this.vx /= this.ax; //set x acceleration
            if (this.dirX === Direction.LEFT) {
                this.x += this.vx;
            } else if (this.dirX === Direction.RIGHT) {
                this.x -= this.vx;
            }
        }

        if (this.isMovingY) {
            this.vy /= this.ay; //set y acceleration
            if (this.dirY === Direction.UP) {
                this.y += this.vy;
            } else if (this.dirY === Direction.DOWN) {
                this.y -= this.vy;
            }
        }
    }

    render() {
        super.render();
        this.setMoving();
    }
}