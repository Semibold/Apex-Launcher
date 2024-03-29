<script setup lang="ts">
import HeadingAtom from '../atom/HeadingAtom.vue';
import CounterAtom from '../atom/CounterAtom.vue';
import PiniaSubmit from './PiniaSubmit.vue';
import { ref } from 'vue';
import { ICounterRef } from '../types';

const counterRef = ref<ICounterRef>();

const onClick = () => {
    if (counterRef.value) {
        counterRef.value.add(100);
    }
};
</script>

<template>
    <HeadingAtom />
    <CounterAtom ref="counterRef" />
    <button @click="onClick">+100</button>
    <PiniaSubmit />
</template>
