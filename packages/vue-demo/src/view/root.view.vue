<template>
    <TimerView :="$props"></TimerView>
    <p v-html="JetbrainsLogo"></p>
</template>

<script>
import JetbrainsLogo from '../asset/jetbrains.svg';
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
