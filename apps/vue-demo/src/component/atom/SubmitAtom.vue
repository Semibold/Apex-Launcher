<template>
    <p>
        <button @click="emits('click')" :disabled="props.submitted">Submit Button (App Level)</button>
    </p>
</template>

<script setup lang="ts">
interface IProps {
    submitted: boolean;
}

interface IEmits {
    (e: 'click'): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>
