import { App } from './app';

function getCustomNode(text: string) {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
}

const app1Container = document.getElementById('app1');
const app2Container = document.getElementById('app2');
const app3Container = document.getElementById('app3');

const app1 = new App(app1Container);
const app2 = new App(app2Container, 2);
const app3 = new App(app3Container, 3, getCustomNode('(app3)'));

setTimeout(() => {
    app3.dispose();
    console.log('[debug] app3 has been disposed');

    setTimeout(() => {
        new App(app3Container, 4, getCustomNode('(app3 with rate=4)'));
        console.log('[debug] re-render app3 with rate=4');
    }, 2000);
}, 4000);
