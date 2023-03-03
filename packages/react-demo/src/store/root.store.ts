import { TimerStore } from './timer.store';

export class RootStore {
    timer = new TimerStore();
}
