import {Shape} from "./Shape";
import {WeaponType} from "../enums/index";
import {Bullet} from "./Bullet";

export abstract class Weapon extends Shape {
    abstract src: string; //image source file path
    abstract bulletsAmount: number;
    abstract clipsAmount: number;

    //constants
    abstract readonly type: WeaponType;
    abstract readonly damage: number;
    abstract readonly bulletsInClip: number;

    shoot(): Bullet {
        return new Bullet(this.x + this.width, this.y + 10, this.damage);
    }
    reload(): void {

    }
}

export class Ak74 extends Weapon {
    src: '';
    bulletsAmount: number = 30;
    clipsAmount: number = 3;

    readonly type: WeaponType = WeaponType.AUTOMATIC;
    readonly damage: number = 33;
    readonly bulletsInClip: number = 30;

    constructor(originX: number, originY: number) {
        super(originX, originY, 120, 40);
    }
}




