import {Shape} from "./Shape";
import {App} from "./App";
import {WallType} from "../enums";
import {Grid} from "./Grid";

export abstract class Wall extends Shape {

    constructor(public grid: Grid, x: number, y: number, width: number, height: number) {
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

    constructor(grid: Grid, row: number, from: number, to: number) {
        super(grid, grid.toPixels(from), grid.toPixels(row), grid.toPixels(to - from), grid.cellSize);
    }
}

//Vertical map wall
export class VWall extends Wall {
    readonly type: WallType = WallType.VERTICAL;

    constructor(grid: Grid, column: number, from: number, to: number) {
        super(grid, grid.toPixels(column), grid.toPixels(from), grid.cellSize, grid.toPixels(to - from));
    }
}
