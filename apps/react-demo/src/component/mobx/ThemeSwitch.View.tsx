import { observer } from 'mobx-react-lite';
import { useStore } from '../../context';
import { useEffect } from 'react';
import { themeStore } from '../../store/global/theme.store';

export const ThemeSwitchView = observer(() => {
    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return <button onClick={() => themeStore.toggle()}>Switch Theme (import global store)</button>;
});

export const ThemeSwitchView2 = observer(() => {
    /**
     * Use ReactContext instead of import variable.
     */
    const { themeStore } = useStore();

    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return <button onClick={() => themeStore.toggle()}>Switch Theme2 (useContext)</button>;
});
