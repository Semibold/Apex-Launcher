import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { RootStore } from './store/root.store';
import JetbrainsLogo from './asset/jetbrains.svg';
import { RootContext } from './context';
import { TimerView } from './view/time.view';

export class App {
    root: Root;
    rootStore: RootStore;
    timer: number;

    constructor(readonly container: HTMLElement, readonly rate?: number) {
        this.rootStore = new RootStore();
        this.root = createRoot(container);
        this.render();
        this.startCount();
    }

    render() {
        this.root.render(
            <RootContext.Provider value={this.rootStore}>
                <TimerView tip={this.rate === 1 || this.rate == null ? null : `${this.rate}x`} />
                <p dangerouslySetInnerHTML={{ __html: JetbrainsLogo }} />
            </RootContext.Provider>,
        );
    }

    startCount() {
        this.timer = window.setInterval(() => {
            this.rootStore.timerStore.increaseTimer(this.rate);
        }, 1000);
    }

    dispose() {
        clearInterval(this.timer);
        this.root.unmount();
        this.root = null;
        this.rootStore = null;
        this.timer = null;
    }
}
