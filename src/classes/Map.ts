import {Shape} from "./Shape";
import {IMapDescr} from "../interfaces/index";
import {Grid} from "./Grid";
import {Game} from "./Game";
import {MapShape} from "./MapShape";
import {Player} from "./Player";
import {Settings} from "../settings";
import {Direction, Key} from "../enums/index";
import {Aim} from "./Aim";

export class Map extends Shape {
    descr: IMapDescr;
    player1: Player;
    player2: Player;
    shapes: MapShape[] = [];
    grid: Grid = new Grid(Settings.gridSize);

    constructor(descr: IMapDescr) {
        super(0, 0, Game.canvas.width, Game.canvas.height);
        this.descr = descr;
        this.createShapes();
        this.initHandlers();
    }

    private createShapes() {
        //shapes
        for (let shape of this.descr.shapes) {
            this.shapes.push(new MapShape(
                this.grid,
                shape.type,
                shape.cells[0],
                shape.cells[1],
                shape.cells[2],
                shape.cells[3],
                shape.name
            ));
        }

        //players
        let player1X = this.grid.toPixels(this.descr.player1StartPos[0]);
        let player1Y = this.grid.toPixels(this.descr.player1StartPos[1]);
        let player2X = this.grid.toPixels(this.descr.player2StartPos[0]);
        let player2Y = this.grid.toPixels(this.descr.player2StartPos[1]);
        this.player1 = new Player(player1X, player1Y, this.shapes);
        this.player2 = new Player(player2X, player2Y, this.shapes);
        this.player1.aim = new Aim();
    }

    private initHandlers() {
        document.body.addEventListener('keydown', (e) => {
            e.preventDefault();
            switch (e.keyCode) {
                case Key.W:
                    this.player1.jump();
                    break;
                case Key.A:
                    this.player1.moveX(Direction.LEFT);
                    break;
                case Key.S:
                    this.player1.sit();
                    break;
                case Key.D:
                    this.player1.moveX(Direction.RIGHT);
                    break;
                case Key.UP:
                    this.player2.jump();
                    break;
                case Key.LEFT:
                    this.player2.moveX(Direction.LEFT);
                    break;
                case Key.DOWN:
                    this.player2.sit();
                    break;
                case Key.RIGHT:
                    this.player2.moveX(Direction.RIGHT);
                    break;
            }
        });
        document.body.addEventListener('keyup', (e) => {
            e.preventDefault();
            switch (e.keyCode) {
                case Key.W:
                    this.player1.stopJumping();
                    break;
                case Key.A:
                    this.player1.stopX();
                    break;
                case Key.S:
                    this.player1.standUp();
                    break;
                case Key.D:
                    this.player1.stopX();
                    break;
                case Key.UP:
                    this.player2.stopJumping();
                    break;
                case Key.LEFT:
                    this.player2.stopX();
                    break;
                case Key.DOWN:
                    this.player2.standUp();
                    break;
                case Key.RIGHT:
                    this.player2.stopX();
                    break;
            }
        });
    }

    render() {
        super.render();
        if (Settings.debugMode) this.grid.render();

        //render shapes
        for (let shape of this.shapes) {
            shape.render();
            if (Settings.debugMode) shape.renderShapeRect();
        }

        //render players
        this.player1.render();
        this.player2.render();
        if (Settings.debugMode) {
            this.player1.renderShapeRect();
            this.player2.renderShapeRect();
        }
    }
}

