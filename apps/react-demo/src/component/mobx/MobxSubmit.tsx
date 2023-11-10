import { useStore } from '../../context';
import { observer } from 'mobx-react-lite';
import { Submit } from '../atom/Submit';
import { useCallback } from 'react';

/**
 * @desc View with Store (Cannot reuse without same store)
 */
export const MobxSubmit = observer(() => {
    // App store (Mobx)
    const { submitStore } = useStore();
    const onClick = useCallback(() => {
        submitStore.toggle();
        setTimeout(() => submitStore.toggle(), 3000);
    }, []);

    return <Submit submitted={submitStore.submitted} onClick={onClick} />;
});
