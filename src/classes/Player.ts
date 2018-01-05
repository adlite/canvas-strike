import {ActiveShape} from "./Shape";
import {App} from "./App";
import {Map} from "./Map";
import {Direction, WallType} from "../enums/index";
import {Wall} from "./Wall";

export class Player extends ActiveShape {
    inAir: boolean = false;
    defaultVX: number = 6;
    defaultVY: number = 20;

    constructor(private readonly map: Map, x: number, y: number) {
        super(x, y - 79, 40, 78); // minus values to prevent walls collisions
        //props
        this.vx = this.defaultVX;
        this.vy = this.defaultVY;
        //styles
        this.opacity = 0.9;
        this.lineWidth = 3;
        this.stroke = '#464646';
    }

    jump() {
        if (!this.inAir) {
            this.inAir = true;
            this.ay = 0.75;
            this.moveY(Direction.UP);
        }
    }

    fall() {
        this.inAir = true;
        this.ay = 1.35;
        this.moveY(Direction.DOWN);
    }

    land(onWall: Wall) {
        this.inAir = false;
        this.stopY();
        this.y = onWall.y - this.height - 1;
        this.vy = this.defaultVY;
    }

    //check if player going to hit one of the map walls
    private hitWallX(): boolean {
        for (let wall of this.map.walls) {
            if (wall.type === WallType.VERTICAL) {
                if (wall.hit(this)) return true;
            }
        }
        return false;
    }

    private checkWallOnNextYStep(): void {
        let result = false;
        let hittedWall: Wall;

        this.setMovingY();
        for (let wall of this.map.walls) {
            if (wall.hit(this)) {
                hittedWall = wall;
                result = true;
                break;
            }
        }

        if (result) {
            this.resetMovingY();
            if (this.inAir) {
                if (this.dirY === Direction.DOWN) {
                    this.land(hittedWall);
                } else if (this.dirY === Direction.UP) {
                    this.fall();
                }
            }
        }
    }

    render(): void {
        super.render();

        this.checkWallOnNextYStep();

        // if (this.inAir) {
        //     if (this.dirY === Direction.DOWN && this.checkWallOnNextYStep()) {
        //         this.land();
        //     }
        // } else {
        //     if (!this.checkWallOnNextYStep()) {
        //         this.fall();
        //     }
        // }

        if (this.vy < 1 && this.dirY === Direction.UP) { //gravity
            this.fall();
        }
        //
        // if (this.hitWallX()) {
        //     this.resetMoving();
        //     this.stopX();
        // }
        //
        // if (this.hitWallOnNextYStep()) {
        //     this.stopY();
        // }

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
