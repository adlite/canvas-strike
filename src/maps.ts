import {IMapDescr} from "./interfaces/index";
import {WallType} from "./enums/index";

export let mapBox: IMapDescr = {
    name: 'Test Box',
    player1StartPos: [4, 29],
    player2StartPos: [8, 29],
    walls: [
        {
            name: 'top wall',
            type: WallType.HORIZONTAL,
            cells: [0, 0, 50, 1]
        },
        {
            name: 'bottom wall',
            type: WallType.HORIZONTAL,
            cells: [0, 29, 50, 1]
        },
        {
            name: 'left wall',
            type: WallType.VERTICAL,
            cells: [0, 1, 1, 28]
        },
        {
            name: 'right wall',
            type: WallType.VERTICAL,
            cells: [49, 1, 1, 28]
        },
        {
            name: 'coridor wall',
            type: WallType.HORIZONTAL,
            cells: [25, 24, 12, 1]
        },
        {
            name: 'flying wall',
            type: WallType.HORIZONTAL,
            cells: [20, 20, 1, 3]
        },
        {
            name: 'hit wall',
            type: WallType.HORIZONTAL,
            cells: [40, 27, 9, 2]
        },
    ]
};
