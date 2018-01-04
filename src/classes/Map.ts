import {Shape} from "./Shape";
import {IMapDescr} from "../interfaces/index";
import {Grid} from "./Grid";
import {App} from "./App";
import {Wall} from "./Wall";
import {Player} from "./Player";
import {Settings} from "../settings";
import {WallType} from "../enums/index";

export class Map extends Shape {
    name: string;
    descr: IMapDescr;
    player1: Player;
    player2: Player;
    walls: Wall[] = [];
    grid: Grid = new Grid(Settings.gridSize);

    constructor(descr: IMapDescr) {
        super(0, 0, App.canvas.width, App.canvas.height);
        this.descr = descr;
        this.name = descr.name;
        this.createWalls();
    }

    private createWalls() {
        for (let wall of this.descr.walls) {
            this.walls.push(new Wall(this.grid, wall.type, wall.cells[0], wall.cells[1], wall.cells[2], wall.cells[3]));
        }
    }

    render() {
        super.render();
        if (Settings.debugMode) this.grid.render();

        //render walls
        for (let wall of this.walls) {
            wall.render();
        }
    }
}

