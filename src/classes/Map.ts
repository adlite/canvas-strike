import {Shape} from "./Shape";
import {IMapDescr} from "../interfaces/index";
import {Grid} from "./Grid";
import {App} from "./App";
import {Wall} from "./Wall";
import {Player} from "./Player";

export class Map extends Shape {
    name: string;
    player1: Player;
    player2: Player;
    walls: Wall[];

    constructor(descr: IMapDescr) {
        super(0, 0, App.canvas.width, App.canvas.height);
        this.name = descr.name;
    }

    render() {
        super.render();

    }
}

