import {Shape} from "./Shape";
import {Loop} from "./Loop";

export class App {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    private loop: Loop = new Loop(() => this.render(), 25);
    shapes: Shape[] = [];

    constructor(canvasID: string, width: number, height: number) {
        this.createDomNode(canvasID, width, height);
        this.createShapes();
        this.loop.start();
    }

    private createDomNode(canvasID: string, width: number, height: number): void {
        App.canvas = document.createElement('canvas');
        App.canvas.setAttribute('id', canvasID);
        App.canvas.setAttribute('width', width.toString());
        App.canvas.setAttribute('height', height.toString());
        App.ctx = App.canvas.getContext('2d');

        if (document.getElementById(canvasID) === null) {
            document.body.appendChild(App.canvas);
        } else {
            throw new Error(`Element with id '${canvasID}' is already exists`);
        }
    }

    private createShapes(): void {
        this.shapes.push(
            // create shapes here
        );
    }

    static clearCanvas(): void {
        App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    }

    public render(): void {
        //clear canvas
        App.clearCanvas();

        //elements' renders
        for (let shape of this.shapes) {
            shape.render();
        }
    }
}