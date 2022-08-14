<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  text: string
}>()
</script>

<template>
  <p>
    <span>{{ text }}</span>
  </p>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

p {
  padding: 4px var(--size-1);
  background-color: var(--element-color);
  border-radius: 3px;

  font-family: var(--ff-roboto);
  font-size: var(--size-4);
  color: var(--text-color-2);

  @include md {
    font-size: var(--size-3);
  }
}
</style>
