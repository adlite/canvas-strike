import {Shape} from "./Shape";
import {Game} from "./Game";

export class Aim extends Shape {
    static readonly SCOPE_DISTANCE = 120;

    mouseX: number = 0;
    mouseY: number = 0;
    inScope: boolean = false;

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
        let relMouseX = this.mouseX - originX;
        let relMouseY = this.mouseY - originY;

        //calc distance between origin and mouse pos using Pythagorean theorem
        let distance = Math.sqrt(Math.pow(relMouseX, 2) + Math.pow(relMouseY, 2));
        if (distance > Aim.SCOPE_DISTANCE) {
            let ratio = distance / Aim.SCOPE_DISTANCE;
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

        Game.ctx.fillStyle = '#fff';
        Game.ctx.fillRect(originX, originY, 3, 3);

        Game.ctx.fillStyle = 'red';
        Game.ctx.fillRect(this.x, this.y, 5, 5);
    }
}
