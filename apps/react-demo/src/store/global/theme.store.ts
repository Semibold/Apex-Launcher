import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';
import { RootContextPointer } from '../context';

/**
 * @desc Global Store (Singleton)
 */
class ThemeStore {
    theme = 'light';

    constructor(readonly pointer: RootContextPointer) {
        makeAutoObservable(this);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
}

/**
 * Shared for Global Store
 */
const GLOBAL_CONTEXT_POINTER: RootContextPointer = new Map();

export const useThemeStore = () => defineStore(ThemeStore)(GLOBAL_CONTEXT_POINTER);
