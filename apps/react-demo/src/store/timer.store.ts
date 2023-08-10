import { makeAutoObservable } from 'mobx';
import { RootStore } from './root.store';

export class TimerStore {
    timePassed = 0;

    constructor(readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }

    increaseTimer(rate = 1) {
        this.timePassed += rate;
    }
}
