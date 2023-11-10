import { defineStore } from 'pinia';

export const useSubmitStore = defineStore('submit', {
    state: () => ({ submitted: false }),
    actions: {
        toggle() {
            this.submitted = !this.submitted;
        },
    },
});
