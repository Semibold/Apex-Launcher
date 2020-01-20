interface AtomicBufferZone {
    fps: number;
    paused: boolean;
    frameId: number;
    playbackRate: number;
    currentFocusTime: number;
    currentFocusTimeStamp: DOMHighResTimeStamp;
    previousFocusTimeStamp: DOMHighResTimeStamp;
    currentFrameTime: number;
    previousFrameTime: number;
}

interface UserInputRange {
    min: number;
    max: number;
    excludeMin?: boolean;
    excludeMax?: boolean;
}

export type FrameCallback = (previousFrameTime: number, currentFrameTime: number) => void;

export abstract class AtomicClock {
    protected readonly zone: AtomicBufferZone;
    protected readonly fpsRange = { min: 1, max: 240 };
    protected readonly playbackRateRange = { min: 0.2, max: 5 };

    protected constructor() {
        this.zone = this.atomicBufferZone;
    }

    protected get atomicBufferZone(): AtomicBufferZone {
        return {
            fps: 60,
            paused: true,
            frameId: 0,
            playbackRate: 1,
            currentFocusTime: 0,
            currentFocusTimeStamp: 0,
            previousFocusTimeStamp: 0,
            currentFrameTime: 0,
            previousFrameTime: 0,
        };
    }

    get paused(): boolean {
        return this.zone.paused;
    }

    get currentTime(): number {
        this.tick();
        return this.zone.currentFocusTime;
    }

    set currentTime(value: number) {
        const min = 0;
        const max = Infinity;

        if (this.isUserInputValid(value, { min, max })) {
            this.tick();
            this.clearAllFrameTime();
            this.zone.currentFocusTime = value;
        } else {
            throw new Error(`value MUST be number and in a range: [${min}, ${max}]`);
        }
    }

    get fps(): number {
        return this.zone.fps;
    }

    set fps(value: number) {
        if (this.isUserInputValid(value, this.fpsRange)) {
            if (this.zone.fps !== value) {
                this.zone.fps = value;
            }
        } else {
            const min = this.fpsRange.min;
            const max = this.fpsRange.max;
            throw new Error(`fps value MUST be number and in a range: [${min}, ${max}]`);
        }
    }

    get playbackRate(): number {
        return this.zone.playbackRate;
    }

    set playbackRate(value: number) {
        if (this.isUserInputValid(value, this.playbackRateRange)) {
            if (this.zone.playbackRate !== value) {
                this.tick();
                this.zone.playbackRate = value;
            }
        } else {
            const min = this.playbackRateRange.min;
            const max = this.playbackRateRange.max;
            throw new Error(`playbackRate value MUST be number and in a range: [${min}, ${max}]`);
        }
    }

    protected isUserInputValid(value: number, range: UserInputRange): boolean {
        let valid = true;

        if (Number.isFinite(value)) {
            if (Number.isNaN(value)) valid = false;
            if (value > range.max || value < range.min) valid = false;
            if (range.excludeMax && value === range.max) valid = false;
            if (range.excludeMin && value === range.min) valid = false;
        } else {
            valid = false;
        }

        return valid;
    }

    protected tick(currentTimeStamp: DOMHighResTimeStamp = performance.now()): boolean {
        if (this.zone.paused) {
            return false;
        }

        if (currentTimeStamp - this.zone.currentFocusTimeStamp > 0) {
            this.zone.previousFocusTimeStamp = this.zone.currentFocusTimeStamp;
            this.zone.currentFocusTimeStamp = currentTimeStamp;

            if (this.zone.currentFocusTimeStamp && this.zone.previousFocusTimeStamp) {
                this.zone.currentFocusTime +=
                    (this.zone.currentFocusTimeStamp - this.zone.previousFocusTimeStamp) * this.zone.playbackRate;
            }
        }

        return true;
    }

    protected frameCall(timeStamp?: DOMHighResTimeStamp): void {
        this.tick(timeStamp);
        this.zone.previousFrameTime = this.zone.currentFrameTime;
        this.zone.currentFrameTime = this.zone.currentFocusTime;
        this.zone.frameId = this.requestFrameCall(this.frameCall.bind(this));
    }

    protected clearAllTimeStamp() {
        this.zone.previousFocusTimeStamp = 0;
        this.zone.currentFocusTimeStamp = 0;
    }

    protected clearAllFrameTime() {
        this.zone.previousFrameTime = 0;
        this.zone.currentFrameTime = 0;
    }

    protected abstract firstFrameCall(callback: (timeStamp?: DOMHighResTimeStamp) => void): number;
    protected abstract requestFrameCall(callback: (timeStamp?: DOMHighResTimeStamp) => void): number;
    protected abstract cancelFrameCall(frameId: number): void;

    play(): boolean {
        if (this.zone.paused) {
            this.clearAllTimeStamp();
            this.zone.paused = false;
            this.zone.frameId = this.firstFrameCall(this.frameCall.bind(this));
            this.tick();
            return true;
        }
        return false;
    }

    pause(): boolean {
        if (!this.zone.paused) {
            this.tick();
            this.cancelFrameCall(this.zone.frameId);
            this.zone.frameId = 0;
            this.zone.paused = true;
            this.clearAllTimeStamp();
            return true;
        }
        return false;
    }

    dispose(): void {
        this.pause();
    }
}
