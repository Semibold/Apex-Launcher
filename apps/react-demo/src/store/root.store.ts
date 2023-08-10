import { TimerStore } from './timer.store';
import { UiStore } from './ui.store';

export class RootStore {
    uiStore = new UiStore(this);
    timerStore = new TimerStore(this);
}
