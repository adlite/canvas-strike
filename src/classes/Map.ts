import {Shape} from "./Shape";
import {IMapDescr} from "../interfaces/index";
import {Grid} from "./Grid";
import {App} from "./App";
import {Wall} from "./Wall";
import {Player} from "./Player";
import {Settings} from "../settings";
import {Direction, Key} from "../enums/index";

export class Map extends Shape {
    descr: IMapDescr;
    player1: Player;
    player2: Player;
    shapes: Shape[] = [];
    grid: Grid = new Grid(Settings.gridSize);

    constructor(descr: IMapDescr) {
        super(0, 0, App.canvas.width, App.canvas.height);
        this.descr = descr;
        this.createShapes();
        this.initHandlers();
    }

    private createShapes() {
        //walls
        for (let shape of this.descr.walls) {
            this.shapes.push(new Wall(
                this.grid,
                shape.type,
                shape.cells[0],
                shape.cells[1],
                shape.cells[2],
                shape.cells[3]
            ));
        }

        //players
        let player1X = this.grid.toPixels(this.descr.player1StartPos[0]);
        let player1Y = this.grid.toPixels(this.descr.player1StartPos[1]);
        let player2X = this.grid.toPixels(this.descr.player2StartPos[0]);
        let player2Y = this.grid.toPixels(this.descr.player2StartPos[1]);
        this.player1 = new Player(player1X, player1Y);
        this.player2 = new Player(player2X, player2Y);
        this.shapes.push(this.player1, this.player2);
    }

    private initHandlers() {
        document.body.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case Key.W:
                    break;
                case Key.A:
                    this.player1.moveX(Direction.LEFT);
                    break;
                case Key.S:
                    break;
                case Key.D:
                    this.player1.moveX(Direction.RIGHT);
                    break;
            }
        });
        document.body.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case Key.A:
                    this.player1.stopX();
                    break;
                case Key.D:
                    this.player1.stopX();
                    break;
            }
        });
    }

    render() {
        super.render();
        if (Settings.debugMode) this.grid.render();

        //render walls
        for (let shape of this.shapes) {
            shape.render();
            if (Settings.debugMode) shape.renderShapeRect();
        }
    }
}

