import {ActiveShape} from "./Shape";
import {App} from "./App";
import {Direction} from "../enums/index";
import {Wall} from "./Wall";

export class Player extends ActiveShape {
    static readonly DEFAULT_VX: number = 8;
    static readonly DEFAULT_JUMP_VY: number = 20;
    static readonly DEFAULT_JUMP_AY: number = 0.82;
    static readonly DEFAULT_GRAVITY_VY: number = 6;
    static readonly DEFAULT_GRAVITY_AY: number = 1.35;
    static readonly MAX_GRAVITY_VY: number = 25;
    isJumping: boolean = false;
    inAir: boolean = false;

    constructor(x: number, y: number) {
        super(x, y - 79, 40, 78); // minus values to prevent walls collisions
        //props
        this.vx = Player.DEFAULT_VX;
        this.vy = Player.DEFAULT_GRAVITY_VY;
        //styles
        this.opacity = 0.9;
        this.lineWidth = 3;
        this.stroke = '#464646';
    }

    jump() {
        if (!this.inAir) {
            this.isJumping = true;
            this.inAir = true;
            this.vy = Player.DEFAULT_JUMP_VY;
            this.ay = Player.DEFAULT_JUMP_AY;
            this.moveY(Direction.UP);
        }
    }

    stopJumping() {
        this.isJumping = false;
    }

    fall() {
        this.inAir = true;
        this.ay = Player.DEFAULT_GRAVITY_AY;
        this.moveY(Direction.DOWN);
    }

    land(onWall: Wall) {
        this.inAir = false;
        this.stopY();
        this.y = onWall.y - this.height - 1;
        this.vy = Player.DEFAULT_GRAVITY_VY;
    }

    private checkWallsOnNextXStep(walls: Wall[]): void {
        let result = false;
        let hittedWall: Wall;

        this.setMovingX();
        for (let wall of walls) {
            if (wall.hit(this)) {
                hittedWall = wall;
                result = true;
                break;
            }
        }

        if (result) {
            this.resetMovingX();
        }
    }

    private checkWallsOnNextYStep(walls: Wall[]): void {
        let result = false;
        let hittedWall: Wall;

        //y++ is to check wall under player's feet while he is being on the ground
        this.inAir ? this.setMovingY() : this.y++;

        for (let wall of walls) {
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
                    if (this.isJumping) this.jump();
                } else if (this.dirY === Direction.UP) {
                    this.fall();
                }
            } else {
                this.y--;
            }
        } else {
            if (!this.inAir) {
                this.vy = Player.DEFAULT_GRAVITY_VY;
                this.fall();
            }
        }
    }

    render(walls: Wall[]): void {
        super.render();
        
        this.checkWallsOnNextXStep(walls);
        this.checkWallsOnNextYStep(walls);

        //gravity
        if (this.vy < 1 && this.dirY === Direction.UP) {
            this.fall();
        } else if (this.vy > Player.MAX_GRAVITY_VY && this.dirY === Direction.DOWN) {
            this.vy = Player.MAX_GRAVITY_VY;
            this.ay = 1;
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