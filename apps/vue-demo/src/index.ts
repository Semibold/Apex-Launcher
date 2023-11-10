import { createVueApp } from './app';

function getElementById(id: string) {
    return document.getElementById(id) as HTMLElement;
}

const app1Container = getElementById('app1');
const app2Container = getElementById('app2');

const disposeApp1 = createVueApp(app1Container);
const disposeApp2 = createVueApp(app2Container);

setTimeout(() => {
    disposeApp2();
    console.log('[debug] app2 has been disposed');

    setTimeout(() => {
        createVueApp(app2Container);
        console.log('[debug] re-render app2');
    }, 2000);
}, 4000);
