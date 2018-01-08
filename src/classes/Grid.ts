import {Game} from "./Game";
import {Shape} from "./Shape";

export class Grid extends Shape {
    readonly cellSize: number;
    readonly rowsCount: number;
    readonly columnsCount: number;

    constructor(cellSize: number) {
        super(0, 0, Game.canvas.width, Game.canvas.height);
        this.cellSize = cellSize;
        this.columnsCount = Game.canvas.width / cellSize;
        this.rowsCount = Game.canvas.height / cellSize;
    }

    toPixels(cellItem: number): number {
        return cellItem * this.cellSize;
    }

    render() {
        Game.ctx.strokeStyle = '#ccc';
        Game.ctx.lineWidth = 0.5;

        //draw vertical lines
        for (let x = 1; x < this.columnsCount; x++) {
            Game.ctx.beginPath();
            Game.ctx.moveTo(x * this.cellSize, 0);
            Game.ctx.lineTo(x * this.cellSize, Game.canvas.height);
            Game.ctx.stroke();
        }

        //draw horizontal lines
        for (let y = 1; y < this.rowsCount; y++) {
            Game.ctx.beginPath();
            Game.ctx.moveTo(0, y * this.cellSize);
            Game.ctx.lineTo(Game.canvas.width, y * this.cellSize);
            Game.ctx.stroke();
        }
    }
}
