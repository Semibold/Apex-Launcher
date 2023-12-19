<script setup lang="ts">
import SubmitAtom from '../atom/SubmitAtom.vue';
import { useSubmitStore } from '../../store/app/submit.store';

const submitStore = useSubmitStore();
const onClick = () => {
    submitStore.toggle();
    setTimeout(() => submitStore.toggle(), 3000);
};
</script>

<template>
    <SubmitAtom :submitted="submitStore.submitted" @click="onClick" />
</template>
