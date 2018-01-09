import {ActiveShape} from "./Shape";

export class Bullet extends ActiveShape {
    readonly damage: number;

    constructor(startX: number, startY: number, damage: number) {
        super(startX, startY, 15, 15);
        this.damage = damage;
    }
}
