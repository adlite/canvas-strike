import {ActiveShape} from "./Shape";
import {Game} from "./Game";
import {Direction, MapShapeType} from "../enums/index";
import {MapShape} from "./MapShape";
import {Aim} from "./Aim";

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

    aim: Aim = null;

    private mapShapes: MapShape[] = [];
    private isJumping: boolean = false;
    private inAir: boolean = false;
    private isSitting: boolean = false;
    private isReadyToStandUp: boolean = false;
    private nearestWall: MapShape = null; //cache nearest wall

    constructor(x: number, y: number, mapShapes: MapShape[]) {
        super(x, y - 79, 30, 78); // minus values to prevent walls collisions
        this.mapShapes = mapShapes;
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

    land(onWall: MapShape) {
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

    //check wall hits in current state
    private hitWalls(): boolean {
        if (this.nearestWall !== null && (this.nearestWall.hit(this))) { //firstly checks in cache
            return true;
        }  else { //else checks all walls
            for (let shape of this.mapShapes) {
                if (shape.type !== MapShapeType.DOOR && shape.hit(this)) {
                    this.nearestWall = shape;
                    return true;
                }
            }
        }
        return false;
    }

    private checkWallsOnNextXStep(): void {
        this.setMovingX();
        if (this.hitWalls()) {
            this.resetMovingX();
        }
    }

    private checkWallsOnNextYStep(): void {
        //y++ is to check wall under player's feet while he is being on the ground
        this.inAir ? this.setMovingY() : this.y++;

        if (this.hitWalls()) {
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

    private checkWallsOnNextStandUp(): void {
        if (this.isReadyToStandUp && this.isSitting) {
            this.setStandUp();
            if (this.hitWalls()) {
                this.sit(); //sit again
                this.isReadyToStandUp = true; //but remember that we wanna stand up
            }
        }
    }

    private getSpineX(): number {
        return this.dirX === Direction.RIGHT
            ? this.x + Player.HEAD_RADIUS
            : this.x + this.width - Player.HEAD_RADIUS;
    }

    private renderHead() {
        Game.ctx.beginPath();
        Game.ctx.arc(this.getSpineX(), this.y + Player.HEAD_RADIUS, Player.HEAD_RADIUS, 0, Math.PI * 2);
        Game.ctx.fill();
    }

    private renderBody() {
        let x = this.getSpineX();

        Game.ctx.beginPath();
        Game.ctx.moveTo(x, this.y + Player.HEAD_RADIUS * 2);
        Game.ctx.lineTo(x, this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT);
        Game.ctx.stroke();
    }

    private renderArms() {
        let x = this.getSpineX();
        let y = this.y + Player.HEAD_RADIUS * 2 + 10;
        let cp1X = this.dirX === Direction.RIGHT ? x + 8 : x - 8;
        let cp1Y = y - 1;
        let cp2X = this.dirX === Direction.RIGHT ? x + 10 : x - 10;
        let cp2Y = y - 1;
        let endX = this.dirX === Direction.RIGHT ? x + 20 : x - 20;
        let endY = y - 7;

        Game.ctx.beginPath();
        Game.ctx.moveTo(x, y);
        Game.ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        Game.ctx.stroke();
    }

    private renderLegs() {
        let originX = this.dirX === Direction.RIGHT
            ? this.x + Player.HEAD_RADIUS
            : this.x + this.width - Player.HEAD_RADIUS;
        let originY = this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT;

        let cp1X = this.dirX === Direction.RIGHT ? originX + 14 : originX - 14;
        let cp1Y = originY + 15;
        let cp2X = this.dirX === Direction.RIGHT ? originX + 14 : originX - 14;
        let cp2Y = originY + 17;
        let endX = this.dirX === Direction.RIGHT ? originX + 14 : originX - 14;
        let endY = this.y + this.height;

        // Left leg
        Game.ctx.beginPath();
        Game.ctx.moveTo(originX, originY);
        Game.ctx.lineTo(this.dirX === Direction.RIGHT ? this.x : this.x + this.width, endY);
        Game.ctx.stroke();

        // Right leg
        Game.ctx.beginPath();
        Game.ctx.moveTo(originX, originY);
        Game.ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        Game.ctx.stroke();
    }

    private renderAim() {
        if (this.aim !== null) {
            this.aim.render(this.x + Player.HEAD_RADIUS, this.y + Player.HEAD_RADIUS);
        }
    }

    render(): void {
        super.render();

        //collisions
        this.checkWallsOnNextXStep();
        this.checkWallsOnNextYStep();
        this.checkWallsOnNextStandUp();

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
        this.renderAim();
    }
}