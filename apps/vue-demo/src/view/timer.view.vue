<!--@desc View with Store (Cannot reuse without same store)-->

<script setup lang="ts">
import TimerCom from '../gallery/timer.com.vue';
import { useTimerStore } from '../store/timer.store';
import { computed } from 'vue';

const props = defineProps({
    rate: Number,
    node: HTMLElement,
});

const tip = computed(() => (props.rate === 1 || props.rate == null ? null : `${props.rate}x`));

const timerStore = useTimerStore();
</script>

<template>
    <TimerCom :timePassed="timerStore.timePassed" :node="props.node" :tip="tip"></TimerCom>
</template>
