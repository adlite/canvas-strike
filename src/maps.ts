import {IMapDescr} from "./interfaces/index";
import {MapShapeType} from "./enums/index";

export let testBox: IMapDescr = {
    name: 'Test Box',
    player1StartPos: [4, 29],
    player2StartPos: [8, 29],
    shapes: [
        {
            name: 'top wall', //just for debug
            type: MapShapeType.WALL,
            cells: [0, 0, 50, 1]
        },
        {
            name: 'bottom wall',
            type: MapShapeType.WALL,
            cells: [0, 29, 50, 1]
        },
        {
            name: 'left wall',
            type: MapShapeType.WALL,
            cells: [0, 1, 1, 28]
        },
        {
            name: 'right wall',
            type: MapShapeType.WALL,
            cells: [49, 1, 1, 28]
        },
        {
            name: 'coridor wall',
            type: MapShapeType.WALL,
            cells: [5, 24, 12, 1]
        },
        {
            name: 'flying wall',
            type: MapShapeType.WALL,
            cells: [23, 25, 6, 1]
        },
        {
            name: 'stairs wall fundament',
            type: MapShapeType.WALL,
            cells: [40, 27, 9, 2]
        },
        {
            name: 'stairs 1 wall',
            type: MapShapeType.WALL,
            cells: [42, 25, 2, 2]
        },
        {
            name: 'stairs 2 wall',
            type: MapShapeType.WALL,
            cells: [44, 23, 2, 4]
        },
        {
            name: 'stairs 3 wall',
            type: MapShapeType.WALL,
            cells: [46, 21, 2, 6]
        },
        {
            name: 'stairs 4 wall',
            type: MapShapeType.WALL,
            cells: [47, 18, 2, 9]
        },
        {
            name: 'flying stairs 1',
            type: MapShapeType.WALL,
            cells: [1, 21, 3, 1]
        },
        {
            name: 'flying stairs 2',
            type: MapShapeType.WALL,
            cells: [8, 18, 5, 1]
        },
        {
            name: 'flying stairs 3',
            type: MapShapeType.WALL,
            cells: [15, 15, 5, 1]
        },
        {
            name: 'flying stairs 4',
            type: MapShapeType.WALL,
            cells: [15, 15, 5, 1]
        },
        {
            name: 'flying stairs 5',
            type: MapShapeType.WALL,
            cells: [25, 13, 5, 1]
        },
    ]
};
