import { App } from './app';

const app1Container = document.getElementById('app1');
const app2Container = document.getElementById('app2');
const app3Container = document.getElementById('app3');

const app1 = new App(app1Container);
const app2 = new App(app2Container, 2);
const app3 = new App(app3Container, 3);

setTimeout(() => {
    app3.dispose();

    setTimeout(() => {
        alert('app3 has been disposed');

        setTimeout(() => {
            new App(app3Container, 4);
            console.log('re-render app3 with rate=4');
        }, 2000);
    });
}, 4000);
