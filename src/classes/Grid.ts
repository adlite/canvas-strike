import {App} from "./App";
import {Shape} from "./Shape";

export class Grid extends Shape {
    readonly cellSize: number;
    readonly rowsCount: number;
    readonly columnsCount: number;

    constructor(cellSize: number) {
        super(0, 0, App.canvas.width, App.canvas.height);
        this.cellSize = cellSize;
        this.columnsCount = App.canvas.width / cellSize;
        this.rowsCount = App.canvas.height / cellSize;
    }

    toPixels(cellItem: number): number {
        return cellItem * this.cellSize;
    }

    render() {
        App.ctx.strokeStyle = '#ccc';
        App.ctx.lineWidth = 0.5;

        //draw vertical lines
        for (let x = 1; x < this.columnsCount; x++) {
            App.ctx.beginPath();
            App.ctx.moveTo(x * this.cellSize, 0);
            App.ctx.lineTo(x * this.cellSize, App.canvas.height);
            App.ctx.stroke();
        }

        //draw horizontal lines
        for (let y = 1; y < this.rowsCount; y++) {
            App.ctx.beginPath();
            App.ctx.moveTo(0, y * this.cellSize);
            App.ctx.lineTo(App.canvas.width, y * this.cellSize);
            App.ctx.stroke();
        }
    }
}
