import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { themeStore } from '../../store/global/theme.store';

export const MobxThemeSwitch = observer(() => {
    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return (
        <p>
            <button onClick={() => themeStore.toggle()}>Switch Theme (Global Level: import global store)</button>
        </p>
    );
});
