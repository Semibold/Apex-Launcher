<template>
    <p>Initial value: {{ initValue }}. Local counter: {{ count }} tick (Component Level)</p>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

let initValue = Math.round(Math.random() * 10);
let count = ref(initValue);
let timer: number = -1;

onMounted(() => {
    timer = window.setInterval(() => {
        count.value++;
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>
