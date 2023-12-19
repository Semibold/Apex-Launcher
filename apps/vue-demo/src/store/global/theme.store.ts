import { createPinia, defineStore } from 'pinia';

/** 这是全局实例，不需要使用 App.use() 注入 */
const GLOBAL_REF = createPinia();

export const useThemeStore = () =>
    defineStore('theme', {
        state: () => ({ theme: 'light' }),
        actions: {
            toggle() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
            },
        },
    })(GLOBAL_REF);
