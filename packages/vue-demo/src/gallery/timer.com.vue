<!--@desc Pure Vue Component (Can reuse in other project)-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    timePassed: { type: Number, required: true },
    tip: String,
    node: HTMLElement,
});

const elRef = ref<HTMLParagraphElement>(null);

onMounted(() => {
    if (props.node) {
        elRef.value.append(props.node);
    }
});

onUnmounted(() => {
    if (props.node) {
        props.node.remove();
    }
});
</script>

<template>
    <p>
        Time passed: {{ props.timePassed }}s{{ props.tip ? ` (${props.tip})` : null }}
        <span ref="elRef" v-if="props.node"></span>
    </p>
</template>
