export class PlaybackTimeElapsedMonitor {

    private intervalId: any;
    private handler: Function;
    private callbackTime: number;
    private timerLastStarted: number = 0;
    private resumeTimeLeft: number = -1;

    constructor(callbackTime: number, handler: Function) {
        this.handler = handler;
        this.callbackTime = callbackTime;
    }

    public startTimer() {
        this.resumeTimeLeft = this.callbackTime;
        this._startTimer();
    }

    public pauseTimer() {
        clearTimeout(this.intervalId);
        this.intervalId = undefined;
        this.resumeTimeLeft -= (new Date().getTime() - this.timerLastStarted);
    }

    public resumeTimer() {
        if (this.resumeTimeLeft < 0) {
            this.resumeTimeLeft = this.callbackTime;
        }
        this._startTimer();
    }

    private _startTimer() {
        this.timerLastStarted = new Date().getTime();
        this.intervalId = setTimeout(() => {
            console.log(`handler fired`)
            this.handler();
        }, this.resumeTimeLeft);
        console.log(`timer started for ${this.resumeTimeLeft} ms`)
    }

}
