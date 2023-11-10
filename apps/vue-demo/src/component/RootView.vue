<template>
    <Section />
    <Section />
    <p class="svg-icon" v-html="JetbrainsLogo"></p>
    <PiniaThemeSwitch />
</template>

<script setup lang="ts">
import { JetbrainsLogo } from '@apex/svg-project';
import PiniaThemeSwitch from './pinia/PiniaThemeSwitch.vue';
import Section from './pinia/Section.vue';
</script>

<style lang="less" scoped>
.svg-icon {
    width: 128px;
}
</style>
