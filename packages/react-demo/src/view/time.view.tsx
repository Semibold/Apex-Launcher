import { TimerCom } from '../gallery/timer.com';
import { useStore } from '../context';
import { observer } from 'mobx-react-lite';

interface ITimeViewProps {
    tip?: string;
}

/**
 * @desc View with Store (Cannot reuse without same store)
 */
export const TimerView = observer((props: ITimeViewProps) => {
    const { timerStore } = useStore();

    return <TimerCom tip={props.tip} timePassed={timerStore.timePassed} />;
});
