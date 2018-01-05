import {IMapDescr} from "./interfaces/index";
import {WallType} from "./enums/index";

export let mapBox: IMapDescr = {
    name: 'Test Box',
    player1StartPos: [4, 29],
    player2StartPos: [8, 29],
    walls: [
        { //top wall
            type: WallType.HORIZONTAL,
            cells: [0, 0, 50, 1]
        },
        { //bottom wall
            type: WallType.HORIZONTAL,
            cells: [0, 29, 50, 1]
        },
        { //left wall
            type: WallType.VERTICAL,
            cells: [0, 1, 1, 28]
        },
        { //right wall
            type: WallType.VERTICAL,
            cells: [49, 1, 1, 28]
        },
        { //flying wall
            type: WallType.VERTICAL,
            cells: [20, 20, 1, 5]
        },
        { //hit wall
            type: WallType.VERTICAL,
            cells: [40, 25, 1, 4]
        },
    ]
};
