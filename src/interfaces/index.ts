import {WallType} from "../enums/index";

export interface ISettings {
    canvasID: string;
    canvasWidth: number;
    canvasHeight: number;
    debugMode: boolean;
    gridSize: number;
    fps: number;
}

export interface IMapDescr {
    name: string;
    player1StartPos: [number, number], //x, y in grid evals
    player2StartPos: [number, number], //x, y in grid evals
    walls: IWallDescr[];
}

export interface IWallDescr {
    type: WallType,
    cells: [number, number, number]
}