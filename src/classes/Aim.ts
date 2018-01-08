import {Shape} from "./Shape";
import {Game} from "./Game";

export class Aim extends Shape {
    private mouseX: number = 0;
    private mouseY: number = 0;

    constructor() {
        super(0, 0, 10, 10);
        this.initHandlers();
    }

    private initHandlers() {
        document.body.addEventListener('mousemove', (e) => this.catchCursorPos(e));
    }

    private catchCursorPos(e: MouseEvent) {
        let rect = Game.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    private calcRenderPos(originX: number, originY: number): void {
        let cathX = this.mouseX - originX; //catheter X
        let cathY = this.mouseY - originY; //catheter Y
        let distance = Math.sqrt(Math.pow(cathX, 2) + Math.pow(cathY, 2));
    }

    render(originX: number, originY: number) {
        super.render();
        this.calcRenderPos(originX, originY);

        Game.ctx.fillStyle = '#fff';
        Game.ctx.fillRect(originX, originY, 3, 3);

        Game.ctx.fillStyle = 'red';
        Game.ctx.fillRect(this.x, this.y, 5, 5);
    }
}
