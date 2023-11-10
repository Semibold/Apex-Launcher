import { makeAutoObservable } from 'mobx';
import { RootStore } from '../root.store';

/**
 * @desc App Store
 */
export class SubmitStore {
    submitted = false;

    constructor(readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }

    toggle() {
        this.submitted = !this.submitted;
    }
}
