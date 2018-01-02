import {Shape} from "./Shape";
import {Grid} from "./Grid";
import {App} from "./App";
import {WallType} from "../enums";

export abstract class Wall extends Shape {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    render() {
        super.render();
        App.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//Horizontal map wall
export class HWall extends Wall {
    readonly type: WallType = WallType.HORIZONTAL;

    constructor(row: number, from: number, to: number) {
        super(Grid.toPixels(from), Grid.toPixels(row), Grid.toPixels(to - from), Grid.cellSize);
    }
}

//Vertical map wall
export class VWall extends Wall {
    readonly type: WallType = WallType.VERTICAL;

    constructor(column: number, from: number, to: number) {
        super(Grid.toPixels(column), Grid.toPixels(from), Grid.cellSize, Grid.toPixels(to - from));
    }
}
