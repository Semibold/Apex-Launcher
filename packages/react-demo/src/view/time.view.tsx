import { TimerCom } from '../gallery/timer.com';
import { useStore } from '../context';
import { observer } from 'mobx-react-lite';

interface ITimeViewProps {
    tip?: string;
    node?: HTMLElement;
}

/**
 * @desc View with Store (Cannot reuse without same store)
 */
export const TimerView = observer((props: ITimeViewProps) => {
    const { timerStore } = useStore();

    return <TimerCom timePassed={timerStore.timePassed} {...props} />;
});
