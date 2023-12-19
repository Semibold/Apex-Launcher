<template>
    <button @click="themeStore.toggle()">Switch Theme</button>
</template>

<script setup lang="ts">
import { useThemeStore } from '../../store/global/theme.store';
import { watch } from 'vue';

const themeStore = useThemeStore();

watch(
    () => themeStore.theme,
    () => {
        document.body.dataset.theme = themeStore.theme;
    },
    { immediate: true },
);
</script>
