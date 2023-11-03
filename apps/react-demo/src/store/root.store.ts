import { TimerStore } from './app/timer.store';
import { UiStore } from './app/ui.store';
import { themeStore } from './global/theme.store';

export class RootStore {
    themeStore = themeStore;

    uiStore = new UiStore(this);
    timerStore = new TimerStore(this);
}
