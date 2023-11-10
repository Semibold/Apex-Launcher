import './style/global.less';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RootStore } from './store/root.store';
import { JetbrainsLogo } from '@apex/svg-project';
import { RootContext } from './context';
import { MobxThemeSwitch } from './component/mobx/MobxThemeSwitch';
import { MobxThemeSwitch2 } from './component/mobx/MobxThemeSwitch2';
import { Section } from './component/mobx/Section';

export function createReactApp(container: HTMLElement, node?: HTMLElement) {
    const rootStore = new RootStore();
    const root = createRoot(container);

    root.render(
        <RootContext.Provider value={rootStore}>
            <Section />
            <Section />
            <p style={{ width: 128 }} dangerouslySetInnerHTML={{ __html: JetbrainsLogo }} />
            <MobxThemeSwitch />
            <MobxThemeSwitch2 />
        </RootContext.Provider>,
    );

    return () => root.unmount();
}
