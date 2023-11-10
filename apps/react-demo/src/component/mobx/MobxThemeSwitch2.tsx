import { observer } from 'mobx-react-lite';
import { useStore } from '../../context';
import { useEffect } from 'react';

/**
 * @desc Only demo
 */
export const MobxThemeSwitch2 = observer(() => {
    /**
     * Use ReactContext instead of import variable.
     */
    const { themeStore } = useStore();

    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return (
        <p>
            <button onClick={() => themeStore.toggle()}>Switch Theme2 (Global Level: useContext)</button>
        </p>
    );
});
