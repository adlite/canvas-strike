import {ActiveShape} from "./Shape";
import {App} from "./App";

export class Player extends ActiveShape {

    constructor(x: number, y: number) {
        super(x, y - 80, 40, 80);
        this.opacity = 0.9;
        this.lineWidth = 3;
        this.lineCap = 'round';
        this.stroke = '#464646';
    }

    render(): void {
        super.render();

        let headRadius = 16;
        let bodyHeight = 24;

        // Head
        App.ctx.beginPath();
        App.ctx.arc(this.x + 20, this.y + headRadius, headRadius, 0, Math.PI * 2);
        App.ctx.fill();

        // Body
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + headRadius * 2);
        App.ctx.lineTo(this.x + 20, this.y + headRadius * 2 + bodyHeight);
        App.ctx.stroke();

        // Arms
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 5, this.y + headRadius * 2 + 10);
        App.ctx.lineTo(this.x + 35, this.y + headRadius * 2 + 10);
        App.ctx.stroke();

        // Left leg
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + headRadius * 2 + bodyHeight);
        App.ctx.lineTo(this.x + 5, this.y + this.height);
        App.ctx.stroke();

        // Right leg
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + headRadius * 2 + bodyHeight);
        App.ctx.lineTo(this.x + 35, this.y + this.height);
        App.ctx.stroke();
    }
}
