import { TimerAtom } from '../atom/Timer.Atom';
import { useStore } from '../../context';
import { observer } from 'mobx-react-lite';

interface ITimeViewProps {
    tip?: string;
    node?: HTMLElement;
}

/**
 * @desc View with Store (Cannot reuse without same store)
 */
export const TimerView = observer((props: ITimeViewProps) => {
    // App store (Mobx)
    const { timerStore } = useStore();

    return <TimerAtom timePassed={timerStore.timePassed} {...props} />;
});
