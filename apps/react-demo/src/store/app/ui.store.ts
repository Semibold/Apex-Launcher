import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';

/**
 * @desc App Store
 */
class UiStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export const useUiStore = defineStore(UiStore);
