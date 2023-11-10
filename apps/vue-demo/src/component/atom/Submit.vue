<template>
    <p>
        <button @click="onClick" :disabled="submitted">Submit Button (App Level)</button>
    </p>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

interface IProps {
    submitted: boolean;
}

interface IEmits {
    (e: 'click'): void;
}

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
const onClick = () => emits('click');
const { submitted } = toRefs(props);
</script>
