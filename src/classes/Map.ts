import {Shape} from "./Shape";
import {IMapDescr} from "../interfaces/index";
import {Grid} from "./Grid";
import {App} from "./App";
import {HWall, VWall, Wall} from "./Wall";
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
            if (wall.type === WallType.HORIZONTAL) {
                this.walls.push(new HWall(this.grid, wall[0], wall[1], wall[2]));
            } else if (wall.type === WallType.VERTICAL) {
                this.walls.push(new VWall(this.grid, wall[0], wall[1], wall[2]));
            }
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

