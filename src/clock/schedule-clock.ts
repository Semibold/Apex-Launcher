import { AtomicClock, FrameCallback } from "./atomic-clock";

export class ScheduleClock extends AtomicClock {
    constructor(
        protected readonly callback: FrameCallback,
        protected readonly clock: (timeStamp: DOMHighResTimeStamp) => DOMHighResTimeStamp = timeStamp => timeStamp,
    ) {
        super();
    }

    protected tick(currentTimeStamp: DOMHighResTimeStamp = performance.now()): boolean {
        const timeStamp = this.clock(currentTimeStamp);

        if (Number.isNaN(timeStamp) || !Number.isFinite(timeStamp) || timeStamp < 0) {
            throw new TypeError("timeStamp MUST be a number and greater than or equal zero");
        }

        return super.tick(timeStamp);
    }

    protected frameCall(timeStamp?: DOMHighResTimeStamp) {
        super.frameCall(timeStamp);
        this.callback(this.zone.previousFrameTime, this.zone.currentFrameTime);
    }

    protected firstFrameCall(callback: () => void): number {
        return self.setTimeout(callback, 0);
    }

    protected requestFrameCall(callback: () => void): number {
        return self.setTimeout(callback, 1000 / this.zone.fps);
    }

    protected cancelFrameCall(frameId: number): void {
        return self.clearTimeout(frameId);
    }
}
