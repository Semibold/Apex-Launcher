import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';

/**
 * @desc App Store
 */
class SubmitStore {
    submitted = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.submitted = !this.submitted;
    }
}

export const useSubmitStore = defineStore('submit', SubmitStore);
