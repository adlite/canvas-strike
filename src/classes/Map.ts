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
    walls: Wall[] = [];
    grid: Grid = new Grid(Settings.gridSize);

    constructor(descr: IMapDescr) {
        super(0, 0, App.canvas.width, App.canvas.height);
        this.descr = descr;
        this.createShapes();
        this.initHandlers();
    }

    private createShapes() {
        //walls
        for (let wall of this.descr.walls) {
            this.walls.push(new Wall(
                this.grid,
                wall.type,
                wall.cells[0],
                wall.cells[1],
                wall.cells[2],
                wall.cells[3]
            ));
        }

        //players
        let player1X = this.grid.toPixels(this.descr.player1StartPos[0]);
        let player1Y = this.grid.toPixels(this.descr.player1StartPos[1]);
        let player2X = this.grid.toPixels(this.descr.player2StartPos[0]);
        let player2Y = this.grid.toPixels(this.descr.player2StartPos[1]);
        this.player1 = new Player(player1X, player1Y);
        this.player2 = new Player(player2X, player2Y);
    }

    private initHandlers() {
        document.body.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case Key.W:
                    this.player1.jump();
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
        for (let wall of this.walls) {
            wall.render();
            if (Settings.debugMode) wall.renderShapeRect();
        }

        //render players
        this.player1.render(this.walls);
        this.player2.render(this.walls);
        if (Settings.debugMode) {
            this.player1.renderShapeRect();
            this.player2.renderShapeRect();
        }
    }
}

