import { UiStore } from './app/ui.store';
import { themeStore } from './global/theme.store';
import { SubmitStore } from './app/submit.store';

export class RootStore {
    themeStore = themeStore;

    uiStore = new UiStore(this);
    submitStore = new SubmitStore(this);
}
