import moment from "moment";
import { autorun, computed, observable, action, makeObservable } from "mobx";

class RootApp {
    @observable
    protected clockValue: number = Date.now();

    protected clockTimer: number;
    protected clockRunner: () => void;
    protected element: HTMLElement;

    @computed
    protected get date() {
        return moment(this.clockValue).locale('zh-cn').format("YYYY/MM/DD a hh:mm:ss");
    }

    constructor() {
        makeObservable(this);
        this.element = document.getElementById("app");
        this.clockTimer = self.setInterval(() => this.setTimeStamp(), 200);
        this.clockRunner = autorun(() => {
            if (this.element) {
                this.element.textContent = this.date;
            }
        });
    }

    @action
    protected setTimeStamp() {
        this.clockValue = Date.now();
    }

    dispose() {
        clearInterval(this.clockTimer);
        this.clockRunner?.();
    }
}

new RootApp();
