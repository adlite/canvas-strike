import {ActiveShape} from "./Shape";
import {App} from "./App";
import {Direction} from "../enums/index";
import {Wall} from "./Wall";

export class Player extends ActiveShape {
    //constants
    static readonly DEFAULT_VX: number = 8;
    static readonly DEFAULT_JUMP_VY: number = 20;
    static readonly DEFAULT_JUMP_AY: number = 0.82;
    static readonly DEFAULT_GRAVITY_VY: number = 6;
    static readonly DEFAULT_GRAVITY_AY: number = 1.35;
    static readonly MAX_GRAVITY_VY: number = 25;
    static readonly HEAD_RADIUS: number = 10;
    static readonly BODY_HEIGHT: number = 28;

    isJumping: boolean = false;
    inAir: boolean = false;
    isSitting: boolean = false;
    private isReadyToStandUp: boolean = false;
    nearestWall: Wall = null; //cache nearest wall

    constructor(x: number, y: number) {
        super(x, y - 79, 40, 78); // minus values to prevent walls collisions
        //props
        this.vx = Player.DEFAULT_VX;
        this.vy = Player.DEFAULT_GRAVITY_VY;
        //styles
        this.opacity = 0.9;
        this.lineWidth = 3;
        this.stroke = '#464646';

        this.fall();
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

    sit() {
        if (!this.isSitting) {
            this.isSitting = true;
            this.isReadyToStandUp = false;
            this.y += Player.HEAD_RADIUS * 2;
            this.height -= Player.HEAD_RADIUS * 2;
        }
    }

    standUp() {
        this.isReadyToStandUp = true;
    }

    private setStandUp() {
        if (this.isSitting) {
            this.isSitting = false;
            this.y -= Player.HEAD_RADIUS * 2;
            this.height += Player.HEAD_RADIUS * 2;
        }
    }

    private hitWalls(walls: Wall[]): boolean {
        if (this.nearestWall !== null && this.nearestWall.hit(this)) {
            return true;
        } else {
            for (let wall of walls) {
                if (wall.hit(this)) {
                    this.nearestWall = wall;
                    return true;
                }
            }
        }
        return false;
    }

    private checkWallsOnNextXStep(walls: Wall[]): void {
        this.setMovingX();
        if (this.hitWalls(walls)) {
            this.resetMovingX();
        }
    }

    private checkWallsOnNextYStep(walls: Wall[]): void {
        //y++ is to check wall under player's feet while he is being on the ground
        this.inAir ? this.setMovingY() : this.y++;

        if (this.hitWalls(walls)) {
            this.resetMovingY();
            if (this.inAir) {
                if (this.dirY === Direction.DOWN) {
                    this.land(this.nearestWall);
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

    private checkWallsOnNextStandUp(walls: Wall[]): void {
        if (this.isReadyToStandUp) {
            this.setStandUp();
            if (this.hitWalls(walls)) {
                this.sit(); //sit again
                this.isReadyToStandUp = true; //but remember that we wanna stand up
            }
        }
    }

    private renderHead() {
        App.ctx.beginPath();
        App.ctx.arc(this.x + 20, this.y + Player.HEAD_RADIUS, Player.HEAD_RADIUS, 0, Math.PI * 2);
        App.ctx.fill();
    }

    private renderBody() {
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + Player.HEAD_RADIUS * 2);
        App.ctx.lineTo(this.x + 20, this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT);
        App.ctx.stroke();
    }

    private renderArms() {
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 5, this.y + Player.HEAD_RADIUS * 2 + 10);
        App.ctx.lineTo(this.x + 35, this.y + Player.HEAD_RADIUS * 2 + 10);
        App.ctx.stroke();
    }

    private renderLegs() {
        // Left leg
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT);
        App.ctx.lineTo(this.x + 10, this.y + this.height);
        App.ctx.stroke();

        // Right leg
        App.ctx.beginPath();
        App.ctx.moveTo(this.x + 20, this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT);
        App.ctx.lineTo(this.x + 30, this.y + this.height);
        App.ctx.stroke();
    }

    render(walls: Wall[]): void {
        super.render();

        //collisions
        this.checkWallsOnNextXStep(walls);
        this.checkWallsOnNextYStep(walls);
        this.checkWallsOnNextStandUp(walls);

        //gravity
        if (this.vy < 1 && this.dirY === Direction.UP) {
            this.fall();
        } else if (this.vy > Player.MAX_GRAVITY_VY && this.dirY === Direction.DOWN) {
            this.vy = Player.MAX_GRAVITY_VY;
            this.ay = 1;
        }

        //render body parts
        this.renderHead();
        this.renderBody();
        this.renderArms();
        this.renderLegs();
    }
}