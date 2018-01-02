import {ActiveShape} from "./Shape";
import {App} from "./App";

export class Player extends ActiveShape {
    radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y, radius * 2, radius * 2);
        this.radius = radius;
    }

    render(): void {
        super.render();
        App.ctx.beginPath();
        App.ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        App.ctx.fill();
    }
}
