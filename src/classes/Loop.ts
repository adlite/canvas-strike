import {Settings} from "../settings";

export class Loop {
    private intervalID: number = null;
    private allowToLog: boolean = false;

    constructor(private renderFunc: () => void) {}

    log(...logs): void { //log once in renderFunc
        if (this.allowToLog) {
            for (let log of logs) {
                console.log(log);
            }
            this.allowToLog = false;
        }
    }

    start(): void {
        if (this.intervalID !== null) clearInterval(this.intervalID);
        this.intervalID = setInterval(() => this.renderFunc(), 1000 / Settings.fps);
        this.allowToLog = true;
    }

    stop(): void {
        if (this.intervalID !== null) {
            clearInterval(this.intervalID);
            this.intervalID = null;
            this.allowToLog = true;
        }
    }
}