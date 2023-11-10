import './style/global.less';
import RootView from './component/RootView.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

export function createVueApp(container: HTMLElement, node?: HTMLElement) {
    const app = createApp(RootView);
    app.use(createPinia()).mount(container);

    return () => app.unmount();
}
