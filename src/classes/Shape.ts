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

        //check if shape2 X-points are between shape1 X-points
        let hitX = function (shape1: Shape, shape2: Shape): boolean {
            //shape1 x angle points
            let ax1 = shape1.x;
            let ax2 = shape1.x + shape1.width;
            //shape2 x shape angle points
            let bx1 = shape2.x;
            let bx2 = shape2.x + shape2.width;

            return (bx1 >= ax1 && bx1 <= ax2) || (bx2 >= ax1 && bx2 <= ax2);
        };

        //check if shape2 Y-points are between shape1 Y-points
        let hitY = function (shape1: Shape, shape2: Shape): boolean {
            //shape1 y angle points
            let ay1 = shape1.y;
            let ay2 = shape1.y + shape1.height;
            //shape2 y shape angle points
            let by1 = shape2.y;
            let by2 = shape2.y + shape2.height;

            return (by1 >= ay1 && by1 <= ay2) || (by2 >= ay1 && by2 <= ay2);
        };

        return (hitX(this, shape) || hitX(shape, this)) && (hitY(this, shape) || hitY(shape, this));
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

    render(...args): void {
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
    dirY: Direction = Direction.DOWN;
    protected isMovingX: boolean = false;
    protected isMovingY: boolean = false;

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
        this.setMovingX();
        this.setMovingY();
    }

    protected setMovingX() {
        if (this.isMovingX) {
            this.vx *= this.ax; //set x acceleration
            if (this.dirX === Direction.LEFT) {
                this.x -= this.vx;
            } else if (this.dirX === Direction.RIGHT) {
                this.x += this.vx;
            }
        }
    }

    protected setMovingY() {
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
        this.resetMovingX();
        this.resetMovingY();
    }

    protected resetMovingX() {
        if (this.isMovingX) {
            this.vx /= this.ax; //reset x acceleration
            if (this.dirX === Direction.LEFT) {
                this.x += this.vx;
            } else if (this.dirX === Direction.RIGHT) {
                this.x -= this.vx;
            }
        }
    }

    protected resetMovingY() {
        if (this.isMovingY) {
            this.vy /= this.ay; //reset y acceleration
            if (this.dirY === Direction.UP) {
                this.y += this.vy;
            } else if (this.dirY === Direction.DOWN) {
                this.y -= this.vy;
            }
        }
    }
}