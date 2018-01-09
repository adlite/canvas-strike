import {ActiveShape} from "./Shape";
import {Game} from "./Game";
import {Direction, MapShapeType} from "../enums/index";
import {MapShape} from "./MapShape";
import {Ak47, Weapon} from "./Weapon";

export class Player extends ActiveShape {
    //constants
    static readonly DEFAULT_VX: number = 8;
    static readonly DEFAULT_SIT_VX: number = 4;
    static readonly DEFAULT_JUMP_VY: number = 20;
    static readonly DEFAULT_JUMP_AY: number = 0.82;
    static readonly DEFAULT_GRAVITY_VY: number = 6;
    static readonly DEFAULT_GRAVITY_AY: number = 1.35;
    static readonly MAX_GRAVITY_VY: number = 25;
    static readonly HEAD_RADIUS: number = 10;
    static readonly BODY_HEIGHT: number = 28;

    private mapShapes: MapShape[] = [];
    private isJumping: boolean = false;
    private inAir: boolean = false;
    private isSitting: boolean = false;
    private isReadyToStandUp: boolean = false;
    private nearestWall: MapShape = null; //cache nearest wall
    currWeapon: Weapon;

    constructor(x: number, y: number, mapShapes: MapShape[]) {
        super(x, y - 79, 30, 78); // minus values to prevent walls collisions
        this.mapShapes = mapShapes;
        this.currWeapon = new Ak47();
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
            this.vx = Player.DEFAULT_SIT_VX;
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
            this.vx = Player.DEFAULT_VX;
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
        return this.x + Player.HEAD_RADIUS;
    }

    private renderHead() {
        super.render();
        let spineX = this.getSpineX();
        //head outer circle
        Game.ctx.beginPath();
        Game.ctx.arc(spineX, this.y + Player.HEAD_RADIUS, Player.HEAD_RADIUS, 0, Math.PI * 2);
        Game.ctx.fill();

        //eyes
        Game.ctx.save();
        Game.ctx.beginPath();
        Game.ctx.fillStyle = '#d5ceff';
        Game.ctx.moveTo(spineX + Player.HEAD_RADIUS, this.y + 8);
        Game.ctx.lineTo(spineX, this.y + 6);
        Game.ctx.lineTo(spineX + Player.HEAD_RADIUS / 2, this.y + 12);
        Game.ctx.fill();
        Game.ctx.restore();
    }

    private renderBody() {
        super.render();
        let x = this.getSpineX();

        Game.ctx.beginPath();
        Game.ctx.moveTo(x, this.y + Player.HEAD_RADIUS * 2);
        Game.ctx.lineTo(x, this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT);
        Game.ctx.stroke();
    }

    private renderArms() {
        super.render();
        let x = this.getSpineX();
        let y = this.y + Player.HEAD_RADIUS * 2 + 10;
        let cp1X = x + 8;
        let cp1Y = y - 1;
        let cp2X = x + 10;
        let cp2Y = y - 1;
        let endX = x + 20;
        let endY = y - 7;

        Game.ctx.beginPath();
        Game.ctx.moveTo(x, y);
        Game.ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
        Game.ctx.stroke();
    }

    private renderLegs() {
        super.render();

        let originX = this.getSpineX();
        let originY = this.y + Player.HEAD_RADIUS * 2 + Player.BODY_HEIGHT;

        if (this.isSitting) {
            let cp1X = originX + 14;
            let cp1Y = originY - 15;
            let cp2X = originX + 14;
            let cp2Y = originY - 17;
            let endX = originX + 14;
            let endY = this.y + this.height;

            // Left leg
            Game.ctx.beginPath();
            Game.ctx.moveTo(originX, originY);
            Game.ctx.lineTo(originX - 2, endY);
            Game.ctx.lineTo(this.x - 5, endY);
            Game.ctx.stroke();

            // Right leg
            Game.ctx.beginPath();
            Game.ctx.moveTo(originX, originY);
            Game.ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            Game.ctx.stroke();
        } else {
            let cp1X = originX + 14;
            let cp1Y = originY + 15;
            let cp2X = originX + 14;
            let cp2Y = originY + 17;
            let endX = originX + 14;
            let endY = this.y + this.height;

            // Left leg
            Game.ctx.beginPath();
            Game.ctx.moveTo(originX, originY);
            Game.ctx.lineTo(this.x, endY);
            Game.ctx.stroke();

            // Right leg
            Game.ctx.beginPath();
            Game.ctx.moveTo(originX, originY);
            Game.ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
            Game.ctx.stroke();
        }
    }

    private renderWeapon() {
        let x = this.getSpineX();
        let y = this.y + Player.HEAD_RADIUS * 2;

        this.currWeapon.render(x, y);

        if (this.dirX === Direction.LEFT) {
            this.currWeapon.x = this.currWeapon.getMirrorX();
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

        //body parts
        let renderBodyParts = () => {
            this.renderHead();
            this.renderBody();
            this.renderArms();
            this.renderLegs();
            this.renderWeapon();
        };

        this.dirX === Direction.RIGHT ? renderBodyParts() : this.renderInMirror(renderBodyParts);
    }
}