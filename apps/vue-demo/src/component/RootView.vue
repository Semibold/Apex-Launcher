<template>
    <PiniaSection />
    <PiniaSection />
    <p class="svg-icon" v-html="JetbrainsLogo"></p>
    <PiniaThemeSwitch />
</template>

<script setup lang="ts">
import { JetbrainsLogo } from '@apex/svg-project';
import PiniaThemeSwitch from './pinia/PiniaThemeSwitch.vue';
import PiniaSection from './pinia/PiniaSection.vue';
</script>

<style lang="less" scoped>
.svg-icon {
    width: 128px;
}
</style>
