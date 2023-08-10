import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { RootStore } from './store/root.store';
import { JetbrainsLogo } from '@apex/svg-project';
import { RootContext } from './context';
import { TimerView } from './view/timer.view';

export class App {
    root: Root;
    rootStore: RootStore;
    timer: number;

    constructor(readonly container: HTMLElement, readonly rate?: number, readonly node?: HTMLElement) {
        this.rootStore = new RootStore();
        this.root = createRoot(container);
        this.render();
        this.startCount();
    }

    render() {
        this.root.render(
            // @ts-ignore
            // @see https://github.com/facebook/react/issues/24304#issuecomment-1094565891
            <RootContext.Provider value={this.rootStore}>
                <TimerView node={this.node} tip={this.rate === 1 || this.rate == null ? null : `${this.rate}x`} />
                <p style={{ width: 128 }} dangerouslySetInnerHTML={{ __html: JetbrainsLogo }} />
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
