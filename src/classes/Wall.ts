import {Shape} from "./Shape";
import {App} from "./App";
import {WallType} from "../enums";
import {Grid} from "./Grid";

export class Wall extends Shape {
    readonly type: WallType;
    readonly grid: Grid;
    readonly name: string;

    constructor(grid: Grid, type: WallType, x: number, y: number, width: number, height: number, name: string = 'default wall') {
        //all values in grid evals
        super(grid.toPixels(x), grid.toPixels(y), grid.toPixels(width), grid.toPixels(height));
        this.grid = grid;
        this.type = type;
        this.name = name;
    }

    render() {
        super.render();
        App.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
