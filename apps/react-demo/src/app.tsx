import './style/global.less';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { JetbrainsLogo } from '@apex/svg-project';
import { MobxThemeSwitch } from './component/mobx/MobxThemeSwitch';
import { Section } from './component/mobx/Section';
import { RootContext } from './store/context';

export function createReactApp(container: HTMLElement, node?: HTMLElement) {
    const root = createRoot(container);
    const rootMap = new Map<object, unknown>();

    root.render(
        <RootContext.Provider value={rootMap}>
            <Section />
            <Section />
            <p style={{ width: 128 }} dangerouslySetInnerHTML={{ __html: JetbrainsLogo }} />
            <MobxThemeSwitch />
        </RootContext.Provider>,
    );

    return () => {
        rootMap.clear();
        root.unmount();
    };
}
