import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useThemeStore } from '../../store/global/theme.store';

// Testing typescript type-check in Monorepo
// Scope package(@types/css-modules) in this project
import styles from '../../style/switch.module.less';

export const MobxThemeSwitch = observer(function MobxThemeSwitch() {
    const themeStore = useThemeStore();

    useEffect(() => {
        document.body.dataset.theme = themeStore.theme;
    }, [themeStore.theme]);

    return (
        <p>
            <button className={styles.button} onClick={() => themeStore.toggle()}>
                Switch Theme (Global Level)
            </button>
        </p>
    );
});
