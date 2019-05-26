import {Shape} from "./Shape";
import {Game} from "./Game";

export abstract class Aim extends Shape {
    protected abstract scopeDistance: number;
    protected abstract lineLength: number;
    protected abstract lineGap: number;

    mouseX: number = 0;
    mouseY: number = 0;
    inScope: boolean = false;

    constructor() {
        super(0, 0, 10, 10);
        this.stroke = '#FFBF3E';
        this.lineCap = 'round';
        this.lineWidth = 3;
        this.initHandlers();
    }

    private initHandlers() {
        document.body.addEventListener('mousemove', this.catchCursorPos);
    }

    private catchCursorPos(e: MouseEvent) {
        let rect = Game.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    private calcRenderPos(originX: number, originY: number): void {
        let relMouseX = this.mouseX - originX;
        let relMouseY = this.mouseY - originY;

        //calc distance between origin and mouse pos using Pythagorean theorem
        let distance = Math.sqrt(Math.pow(relMouseX, 2) + Math.pow(relMouseY, 2));
        if (distance > this.scopeDistance && this.scopeDistance !== -1) {
            let ratio = distance / this.scopeDistance;
            let relX = relMouseX / ratio;
            let relY = relMouseY / ratio;
            this.x = relX + originX;
            this.y = relY + originY;
            this.inScope = false;
        } else {
            this.x = this.mouseX;
            this.y = this.mouseY;
            this.inScope = true;
        }
    }

    render(originX: number, originY: number) {
        super.render();
        this.calcRenderPos(originX, originY);
    }
}

export class GunAim extends Aim {
    protected scopeDistance: number = 120;
    protected lineLength: number = 10;
    protected lineGap: number = 5;

    render(originX: number, originY: number) {
        super.render(originX, originY);

        //left
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x - this.lineGap - this.lineLength, this.y);
        Game.ctx.lineTo(this.x - this.lineGap, this.y);
        Game.ctx.stroke();

        //right
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x + this.lineGap + this.lineLength, this.y);
        Game.ctx.lineTo(this.x + this.lineGap, this.y);
        Game.ctx.stroke();

        //top
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x, this.y - this.lineGap - this.lineLength);
        Game.ctx.lineTo(this.x, this.y - this.lineGap);
        Game.ctx.stroke();

        //bottom
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x, this.y + this.lineGap + this.lineLength);
        Game.ctx.lineTo(this.x, this.y + this.lineGap);
        Game.ctx.stroke();
    }
}

export class GameAim extends Aim {
    protected scopeDistance: number = -1;
    protected lineLength: number = 7;
    protected lineGap: number = 0;

    constructor() {
        super();
        this.lineWidth = 2;
    }

    render(originX: number, originY: number) {
        super.render(originX, originY);

        //left
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x - this.lineLength / 2, this.y  - this.lineLength / 2);
        Game.ctx.lineTo(this.x + this.lineLength / 2, this.y + this.lineLength / 2);
        Game.ctx.stroke();

        //right
        Game.ctx.beginPath();
        Game.ctx.moveTo(this.x + this.lineLength / 2, this.y  - this.lineLength / 2);
        Game.ctx.lineTo(this.x  - this.lineLength / 2, this.y + this.lineLength / 2);
        Game.ctx.stroke();
    }
}
