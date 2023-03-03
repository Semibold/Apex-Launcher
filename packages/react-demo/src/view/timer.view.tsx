import { observer } from 'mobx-react-lite';
import { TimerStore } from '../store/timer.store';

interface ITimerViewProps {
    timer: TimerStore;
}

export const TimerView = observer((props: ITimerViewProps) => <p>Seconds passed: {props.timer.secondsPassed}</p>);
