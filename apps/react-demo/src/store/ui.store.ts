import { RootStore } from './root.store';
import { makeAutoObservable } from 'mobx';

export class UiStore {
    constructor(readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }
}
