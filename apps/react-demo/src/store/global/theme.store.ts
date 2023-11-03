import { makeAutoObservable } from 'mobx';

/**
 * @desc Global Store (Singleton)
 */
class ThemeStore {
    theme = 'light';

    constructor() {
        makeAutoObservable(this);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
}

export const themeStore = new ThemeStore();
