<template>
    <p>Initial value: {{ initValue }}. Local counter: {{ data.count }} tick (Component Level)</p>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import { ICounterRef } from '../types';

let initValue = Math.round(Math.random() * 10);
let timer: number = -1;
let data = reactive({ count: initValue });

onMounted(() => {
    timer = window.setInterval(() => {
        data.count++;
    }, 1000);
});

defineExpose<ICounterRef>({
    add(x: number) {
        data.count += x;
    },
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>
