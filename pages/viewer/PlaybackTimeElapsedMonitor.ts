export class PlaybackTimeElapsedMonitor {

    private intervalId: any;
    private handler: Function;
    private callbackTime: number;

    constructor(callbackTime: number, handler: Function) {
        this.handler = handler;
        this.callbackTime = callbackTime;
    }

    public resumeTimer() {
        this.intervalId = setInterval(this.handler, this.callbackTime);
    }

    public pauseTimer() {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
    }

}
