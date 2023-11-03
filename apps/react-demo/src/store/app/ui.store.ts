import { RootStore } from '../root.store';
import { makeAutoObservable } from 'mobx';

/**
 * @desc App Store
 */
export class UiStore {
    constructor(readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }
}
