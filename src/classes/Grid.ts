import {App} from "./App";

export class Grid {
    static readonly cellSize: number = App.settings.gridSize;
    static readonly rowsCount: number = App.canvas.width / Grid.cellSize;
    static readonly columnsCount: number = App.canvas.height / Grid.cellSize;

    static toPixels(cellItem: number): number {
        return cellItem * Grid.cellSize - Grid.cellSize;
    }

    static render() {
        App.ctx.strokeStyle = '#ccc';
        App.ctx.lineWidth = 0.5;

        //draw vertical lines
        for (let x = 1; x < Grid.columnsCount; x++) {
            App.ctx.beginPath();
            App.ctx.moveTo(x * Grid.cellSize, 0);
            App.ctx.lineTo(x * Grid.cellSize, App.canvas.height);
            App.ctx.stroke();
        }

        //draw horizontal lines
        for (let y = 1; y < Grid.rowsCount; y++) {
            App.ctx.beginPath();
            App.ctx.moveTo(0, y * Grid.cellSize);
            App.ctx.lineTo(App.canvas.width, y * Grid.cellSize);
            App.ctx.stroke();
        }
    }
}
