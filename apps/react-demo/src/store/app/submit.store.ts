import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';
import { RootContextPointer } from '../context';

/**
 * @desc App Store
 */
class SubmitStore {
    submitted = false;

    constructor(readonly pointer: RootContextPointer) {
        makeAutoObservable(this);
    }

    toggle() {
        this.submitted = !this.submitted;
    }
}

export const useSubmitStore = defineStore(SubmitStore);
