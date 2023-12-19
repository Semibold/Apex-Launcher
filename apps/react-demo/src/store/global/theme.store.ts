import { makeAutoObservable } from 'mobx';
import { defineStore } from '../defineStore';

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

/**
 * Shared for Global Store
 */
const globalContextValue = new Map<string, unknown>();

export const useThemeStore = () => defineStore('theme', ThemeStore)(globalContextValue);
