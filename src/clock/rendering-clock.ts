import { AtomicClock, FrameCallback } from "./atomic-clock";

export class RenderingClock extends AtomicClock {
    constructor(protected readonly callback: FrameCallback) {
        super();
    }

    get fps(): number {
        if (this.zone.currentFrameTime - this.zone.previousFrameTime > 0) {
            return 1000 / (this.zone.currentFrameTime - this.zone.previousFrameTime);
        } else {
            return 0;
        }
    }

    protected frameCall(timeStamp: DOMHighResTimeStamp) {
        super.frameCall(timeStamp);
        this.callback(this.zone.previousFrameTime, this.zone.currentFrameTime);
    }

    protected firstFrameCall(callback: (timeStamp: DOMHighResTimeStamp) => void): number {
        return this.requestFrameCall(callback);
    }

    protected requestFrameCall(callback: (timeStamp: DOMHighResTimeStamp) => void): number {
        return requestAnimationFrame(callback);
    }

    protected cancelFrameCall(frameId: number): void {
        return cancelAnimationFrame(frameId);
    }
}
