import React from 'react';
import { createRoot } from 'react-dom/client';
import { RootStore } from './store/root.store';
import { TimerView } from './view/timer.view';
import JetbrainsLogo from './asset/jetbrains.svg';

const rootStore = new RootStore();
const root = createRoot(document.getElementById('app'));

root.render(
    <>
        <TimerView timer={rootStore.timer} />
        <p dangerouslySetInnerHTML={{ __html: JetbrainsLogo }} />
    </>,
);

setInterval(() => {
    rootStore.timer.increaseTimer();
}, 1000);
