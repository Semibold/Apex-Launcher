<template>
    <button @click="toggleTheme">Switch Theme</button>
</template>

<script setup lang="ts">
import { themeStore } from '../../store/global/theme.store';
import { watch } from 'vue';

const toggleTheme = () => themeStore.toggle();

watch(
    () => themeStore.theme,
    () => {
        document.body.dataset.theme = themeStore.theme;
    },
    { immediate: true },
);
</script>
