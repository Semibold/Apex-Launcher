import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useThemeStore } from '../../store/global/theme.store';

export const MobxThemeSwitch = observer(() => {
    const themeStore = useThemeStore();

    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return (
        <p>
            <button onClick={() => themeStore.toggle()}>Switch Theme (Global Level)</button>
        </p>
    );
});
