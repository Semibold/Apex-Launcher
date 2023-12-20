import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';
import { RootContextPointer } from '../context';

/**
 * @desc App Store
 */
class UiStore {
    constructor(readonly pointer: RootContextPointer) {
        makeAutoObservable(this);
    }
}

export const useUiStore = defineStore(UiStore);
