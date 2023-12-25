import { observer } from 'mobx-react-lite';
import { Submit } from '../atom/Submit';
import { useCallback } from 'react';
import { useSubmitStore } from '../../store/app/submit.store';

/**
 * @desc View with Store (Cannot reuse without same store)
 */
export const MobxSubmit = observer(function InMobxSubmit() {
    // App store (Mobx)
    const submitStore = useSubmitStore();
    const onClick = useCallback(() => {
        submitStore.toggle();
        setTimeout(() => submitStore.toggle(), 3000);
    }, []);

    return <Submit submitted={submitStore.submitted} onClick={onClick} />;
});
