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
        App.ctx.strokeStyle = 'red';
        App.ctx.globalAlpha = 1;
        App.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    render(): void {
        App.ctx.strokeStyle = this.stroke;
        App.ctx.fillStyle = this.fill;
        App.ctx.globalAlpha = this.opacity;
    }
}

export abstract class ActiveShape extends Shape {
    vx: number = 1; //velocity x
    vy: number = 1; //velocity y
    ax: number = 1; //acceleration x
    ay: number = 1; //acceleration y
    dirX: Direction;
    dirY: Direction;
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

    render() {
        super.render();

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
}

export class Ball extends Shape {
    radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y, radius * 2, radius * 2);
        this.radius = radius;
    }

    render(): void {
        super.render();
        App.ctx.beginPath();
        App.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        App.ctx.fill();
    }
}

