<template>
    <p>Initial value: {{ initValue }}. Local counter: {{ data.count }} tick (Component Level)</p>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';

let initValue = Math.round(Math.random() * 10);
let timer: number = -1;
let data = reactive({ count: initValue });

onMounted(() => {
    timer = window.setInterval(() => {
        data.count++;
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>
