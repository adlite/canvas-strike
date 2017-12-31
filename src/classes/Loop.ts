export class Loop {
    private intervalID: number = null;
    private allowToLog: boolean = false;

    constructor(private renderFunc: () => void, public fps: number) {}

    log(...logs): void { //log once in renderFunc
        if (this.allowToLog) {
            for (let log of logs) {
                console.log(log);
            }
            this.allowToLog = false;
        }
    }

    start() {
        this.intervalID = setInterval(() => this.renderFunc(), 1000 / this.fps);
        this.allowToLog = true;
    }

    stop() {
        if (this.intervalID !== null) {
            clearInterval(this.intervalID);
            this.intervalID = null;
            this.allowToLog = true;
        }
    }
}