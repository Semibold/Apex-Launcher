import { createReactApp } from './app';

function getElementById(id: string) {
    return document.getElementById(id) as HTMLElement;
}

const app1Container = getElementById('app1');
const app2Container = getElementById('app2');

const disposeApp1 = createReactApp(app1Container);
const disposeApp2 = createReactApp(app2Container);

setTimeout(() => {
    disposeApp2();
    console.log('[debug] app2 has been disposed');

    setTimeout(() => {
        createReactApp(app2Container);
        console.log('[debug] re-render app2');
    }, 2000);
}, 4000);
