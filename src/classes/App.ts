import {Shape, Ball} from "./Shape";

export class App {
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    private intervalID: number = null;
    private allowToLog: boolean = false;
    shapes: Shape[] = [];

    constructor(canvasID: string, width: number, height: number) {
        this.createDomNode(canvasID, width, height);
        this.createShapes();
        this.render();
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
            new Ball(50, App.canvas.height - 100, 50),
            new Ball(80, App.canvas.height - 100, 50),
        );
    }

    static clearCanvas(): void {
        App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    }

    private logRender(...logs): void { //TODO: logRender is not a func in render()
        if (this.allowToLog) {
            for (let log of logs) {
                console.log(log);
            }
            this.allowToLog = false;
        }
    }

    public startLoop(): void {
        this.intervalID = setInterval(this.render, 200);
        this.allowToLog = true;
    }

    public stopLoop(): void {
        if (this.intervalID !== null) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }

    public render(): void {
        //clear canvas
        App.clearCanvas();

        //elements' renders
        // for (let shape of this.shapes) {
        //     shape.render();
        // }
        let ball1 = new Ball(50, App.canvas.height - 100, 50);
        let ball2 = new Ball(80, App.canvas.height - 100, 50);
        ball1.fill = 'green';
        ball2.fill = 'blue';
        console.log('ball1.hit(ball2): ', ball1.hit(ball2));
        ball1.render();
        ball2.render();

        this.logRender('this: ', this);
    }
}