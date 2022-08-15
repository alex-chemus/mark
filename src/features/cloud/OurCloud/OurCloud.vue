<script lang="ts" setup>
import { defineProps } from 'vue'
import data from '../data'

defineProps<{
  group: string
}>()
</script>

<template>
  <div>{{ group }}</div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
