import {Shape} from "./Shape";
import {Loop} from "./Loop";
import {Settings} from "../settings";
import {Map} from "./Map";
import {mapBox} from "../maps";

export class App {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    public loop: Loop = new Loop(() => this.render(), Settings.fps);
    private shapes: Shape[] = [];

    constructor() {
        this.createDomNode();
        this.createShapes();
        this.loop.start();
    }

    private createDomNode(): void {
        App.canvas = document.createElement('canvas');
        App.canvas.setAttribute('id', Settings.canvasID);
        App.canvas.setAttribute('width', Settings.canvasWidth.toString());
        App.canvas.setAttribute('height', Settings.canvasHeight.toString());
        App.ctx = App.canvas.getContext('2d');

        if (document.getElementById(Settings.canvasID) === null) {
            document.body.appendChild(App.canvas);
        } else {
            throw new Error(`Element with id '${Settings.canvasID}' is already exists`);
        }
    }

    private createShapes(): void {
        this.shapes.push(
            new Map(mapBox)
        );
    }

    static clearCanvas(): void {
        if (App.ctx) {
            App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
        }
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