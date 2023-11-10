import { reactive } from 'vue';

export const themeStore = reactive({
    theme: 'light',
    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
});
