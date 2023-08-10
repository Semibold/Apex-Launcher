<template>
    <TimerView :="$props"></TimerView>
    <p class="svg-icon" v-html="JetbrainsLogo"></p>
</template>

<script>
import { JetbrainsLogo } from '@apex/svg-project';
import TimerView from './timer.view.vue';

export default {
    name: 'RootView',
    components: {
        TimerView,
    },
    props: {
        rate: Number,
        node: HTMLElement,
    },
    data() {
        return {
            JetbrainsLogo,
        };
    },
};
</script>

<style lang="less" scoped>
.svg-icon {
    width: 128px;
}
</style>
