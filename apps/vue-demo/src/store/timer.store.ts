import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', {
    state: () => ({ timePassed: 0 }),
    actions: {
        increaseTimer(rate = 1) {
            this.timePassed += rate;
        },
    },
});
