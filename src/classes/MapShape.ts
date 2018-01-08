import {Shape} from "./Shape";
import {Game} from "./Game";
import {MapShapeType} from "../enums";
import {Grid} from "./Grid";

export class MapShape extends Shape {
    readonly type: MapShapeType;
    readonly grid: Grid;
    readonly name: string;

    constructor(grid: Grid, type: MapShapeType, x: number, y: number, width: number, height: number, name: string = 'map shape') {
        //all values in grid evals
        super(grid.toPixels(x), grid.toPixels(y), grid.toPixels(width), grid.toPixels(height));
        this.grid = grid;
        this.type = type;
        this.name = name;
    }

    render() {
        super.render();
        Game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
