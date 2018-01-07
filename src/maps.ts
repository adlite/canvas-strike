import {IMapDescr} from "./interfaces/index";
import {WallType} from "./enums/index";

export let mapBox: IMapDescr = {
    name: 'Test Box',
    player1StartPos: [4, 29],
    player2StartPos: [8, 29],
    walls: [
        {
            name: 'top wall', //just for debug
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
            cells: [5, 24, 12, 1]
        },
        {
            name: 'flying wall',
            type: WallType.HORIZONTAL,
            cells: [23, 26, 6, 1]
        },
        {
            name: 'stairs wall fundament',
            type: WallType.HORIZONTAL,
            cells: [40, 27, 9, 2]
        },
        {
            name: 'stairs 1 wall',
            type: WallType.HORIZONTAL,
            cells: [42, 25, 2, 2]
        },
        {
            name: 'stairs 2 wall',
            type: WallType.HORIZONTAL,
            cells: [44, 23, 2, 4]
        },
        {
            name: 'stairs 3 wall',
            type: WallType.HORIZONTAL,
            cells: [46, 21, 2, 6]
        },
        {
            name: 'stairs 4 wall',
            type: WallType.HORIZONTAL,
            cells: [47, 18, 2, 9]
        },
        {
            name: 'flying stairs 1',
            type: WallType.HORIZONTAL,
            cells: [1, 21, 3, 1]
        },
        {
            name: 'flying stairs 2',
            type: WallType.HORIZONTAL,
            cells: [8, 18, 5, 1]
        },
        {
            name: 'flying stairs 3',
            type: WallType.HORIZONTAL,
            cells: [15, 15, 5, 1]
        },
        {
            name: 'flying stairs 4',
            type: WallType.HORIZONTAL,
            cells: [15, 15, 5, 1]
        },
        {
            name: 'flying stairs 5',
            type: WallType.HORIZONTAL,
            cells: [25, 13, 5, 1]
        },
    ]
};
