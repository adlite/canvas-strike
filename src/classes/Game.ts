import {Shape} from "./Shape";
import {Loop} from "./Loop";
import {Settings} from "../settings";
import {Map} from "./Map";
import {testBox} from "../maps";
import {ISettings} from "../interfaces/index";

export class Game {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    static loop: Loop = new Loop(() => Game.render(), Settings.fps);
    static shapes: Shape[] = [];
    static settings: ISettings = Settings;

    static init(): void {
        this.createDomNode();
        this.createShapes();
    }

    static start() {
        Game.loop.start();
    }

    static stop() {
        Game.loop.stop();
    }

    private static createDomNode(): void {
        if (document.getElementById(Settings.canvasID) === null) {
            Game.canvas = document.createElement('canvas');
            Game.canvas.setAttribute('id', Settings.canvasID);
            Game.canvas.setAttribute('width', Settings.canvasWidth.toString());
            Game.canvas.setAttribute('height', Settings.canvasHeight.toString());
            Game.ctx = Game.canvas.getContext('2d');

            document.body.appendChild(Game.canvas);
        } else {
            throw new Error(`Element with id '${Settings.canvasID}' is already exists`);
        }
    }

    private static createShapes(): void {
        Game.shapes.push(new Map(testBox));
    }

    static clearCanvas(): void {
        if (Game.ctx) {
            Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        }
    }

    static render(): void {
        //clear canvas
        Game.clearCanvas();

        //elements' renders
        for (let shape of Game.shapes) {
            shape.render();
        }
    }
}