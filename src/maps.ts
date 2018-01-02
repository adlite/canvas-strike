import {IMapDescr} from "./interfaces/index";
import {WallType} from "./enums/index";

export let mapBox: IMapDescr = {
    name: 'Test Box',
    player1StartPos: [4, 49],
    player2StartPos: [8, 49],
    walls: [
        { //top wall
            type: WallType.HORIZONTAL,
            cells: [0, 0, 50]
        },
        { //bottom wall
            type: WallType.HORIZONTAL,
            cells: [50, 0, 50]
        },
        { //left wall
            type: WallType.VERTICAL,
            cells: [0, 1, 29]
        },
        { //right wall
            type: WallType.VERTICAL,
            cells: [50, 1, 29]
        },
    ]
};
