import { makeAutoObservable } from 'mobx';

export class TimerStore {
    secondsPassed = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increaseTimer() {
        this.secondsPassed += 1;
    }
}
