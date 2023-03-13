import RootView from './view/root.view.vue';
import { createApp, App } from 'vue';
import { createPinia } from 'pinia';
import { useTimerStore } from './store/timer.store';

export default class {
    root: App<Element>;
    timer: number;

    constructor(readonly container: HTMLElement, readonly rate?: number, readonly node?: HTMLElement) {
        this.render();
        this.startCount();
    }

    render() {
        this.root = createApp(RootView, {
            rate: this.rate,
            node: this.node,
        });
        this.root.use(createPinia());
        this.root.mount(this.container);
    }

    startCount() {
        const timerStore = useTimerStore();

        this.timer = window.setInterval(() => {
            timerStore.increaseTimer(this.rate);
        }, 1000);
    }

    dispose() {
        clearInterval(this.timer);
        this.root.unmount();
        this.root = null;
        this.timer = null;
    }
}
