import {App} from "./App";

export abstract class Shape {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    abstract width: number;
    abstract height: number;
    stroke: string = '#ccc';
    fill: string = '#464646';
    opacity: number = 1;
    //render shape rect borders for debug purposes
    showShapeRect: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.canvas = App.canvas;
        this.ctx = App.ctx;
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

        let hitHoriz: boolean = false;
        let hitVert: boolean = false;

        if ((bx1 >= ax1 && bx1 <= ax2) || (bx2 >= ax1 && bx2 <= ax2)) {
            hitHoriz = true;
        }
        if ((by1 >= ay1 && by1 <= ay2) || (bx2 >= ay1 && by2 <= ay2)) {
            hitVert = true;
        }

        return hitVert && hitHoriz;
    }

    render(): void {
        if (this.showShapeRect) {
            this.ctx.strokeStyle = 'red';
            this.ctx.globalAlpha = 1;
            this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.ctx.strokeStyle = this.stroke;
        this.ctx.fillStyle = this.fill;
        this.ctx.globalAlpha = this.opacity;
    }
}

export class Ball extends Shape {
    radius: number;
    width: number;
    height: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
        this.width = radius * 2;
        this.height = radius * 2;
    }

    render(): void {
        super.render();
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class __ExampleShapeChild extends Shape {
    width: number;
    height: number;

    constructor(x: number, y: number) {
        super(x, y);
        this.width = 0;
        this.height = 0;
    }

    render(): void {
        super.render();
        //do stuff
    }
}