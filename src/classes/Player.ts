import {ActiveShape} from "./Shape";
import {App} from "./App";
import {Wall} from "./Wall";
import {Direction} from "../enums/index";
import {Map} from "./Map";

export class Player extends ActiveShape {

    constructor(private map: Map, x: number, y: number) {
        super(x, y - 79, 40, 78); // -81 to prevent bottom walls collision
        //props
        this.vx = 6;
        //styles
        this.opacity = 0.9;
        this.lineWidth = 3;
        this.stroke = '#464646';
    }

    //check if player going to hit one of the map walls
    private hitWallX(): boolean {
        for (let wall of this.map.walls) {
            if (wall.hit(this)) return true;
            if (this.isMovingX) {
                this.setMoving();
                let result = wall.hit(this);
                this.resetMoving();
                if (result) return true;
            }
        }
        return false;
    }

    render(): void {
        super.render();

        if (this.hitWallX()) {
            this.resetMoving();
            this.stopX();
        }

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
