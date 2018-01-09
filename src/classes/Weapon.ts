import {Shape} from "./Shape";
import {WeaponType} from "../enums/index";
import {Bullet} from "./Bullet";
import {Game} from "./Game";

export abstract class Weapon extends Shape {
    abstract bulletsAmount: number;
    abstract clipsAmount: number;

    //constants
    abstract readonly type: WeaponType;
    abstract readonly damage: number;
    abstract readonly bulletsInClip: number;
    abstract readonly sx: number;
    abstract readonly sy: number;
    abstract readonly sWidth: number;
    abstract readonly sHeight: number;

    shoot(): Bullet {
        return new Bullet(this.x + this.width, this.y + 10, this.damage);
    }

    reload(): void {

    }

    render(originX: number, originY: number) {
        super.render();
        this.x = originX;
        this.y = originY;
        if (Game.spriteLoaded) {
            Game.ctx.drawImage(
                Game.sprite,
                this.sx,
                this.sy,
                this.sWidth,
                this.sHeight,
                this.x,
                this.y,
                this.sWidth,
                this.sHeight
            );
        }
    }
}

export class Ak47 extends Weapon {
    bulletsAmount: number = 30;
    clipsAmount: number = 3;

    readonly type: WeaponType = WeaponType.AUTOMATIC;
    readonly damage: number = 33;
    readonly bulletsInClip: number = 30;
    readonly sx: number = 78;
    readonly sy: number = 82;
    readonly sWidth: number = 62;
    readonly sHeight: number = 25;

    constructor() {
        super(0, 0, 62, 25);
    }
}


