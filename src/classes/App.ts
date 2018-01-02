import {Shape} from "./Shape";
import {Loop} from "./Loop";
import {ISettings} from "../interfaces/index";
import settings from "../settings";
import {Grid} from "./Grid";
import {Map} from "./Map";
import {mapBox} from "../maps";

export class App {
    static settings: ISettings = settings;
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    public loop: Loop = new Loop(() => this.render(), 25);
    private shapes: Shape[] = [];

    constructor() {
        this.createDomNode();
        this.createShapes();
        this.loop.start();
    }

    private createDomNode(): void {
        App.canvas = document.createElement('canvas');
        App.canvas.setAttribute('id', App.settings.canvasID);
        App.canvas.setAttribute('width', App.settings.canvasWidth.toString());
        App.canvas.setAttribute('height', App.settings.canvasHeight.toString());
        App.ctx = App.canvas.getContext('2d');

        if (document.getElementById(App.settings.canvasID) === null) {
            document.body.appendChild(App.canvas);
        } else {
            throw new Error(`Element with id '${App.settings.canvasID}' is already exists`);
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
        if (App.settings.debugMode) Grid.render();
        for (let shape of this.shapes) {
            if (App.settings.debugMode) shape.renderShapeRect();
            shape.render();
        }
    }
}