<script setup lang="ts">
import Submit from '../atom/Submit.vue';
import { useSubmitStore } from '../../store/app/submit.store';

const submitStore = useSubmitStore();
const onClick = () => {
    submitStore.toggle();
    setTimeout(() => submitStore.toggle(), 3000);
};
</script>

<template>
    <Submit :submitted="submitStore.submitted" @click="onClick" />
</template>
