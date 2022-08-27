<script lang="ts" setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => document.title = '404')
</script>

<template>
  <div class="wrapper">
    <h1>404</h1>
    <h6>Ничего не найдено</h6>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.wrapper {
  height: 100%;
  @include container;
  @include flex(center, center, column);
}

h1 {
  font-size: var(--size-15);
  font-family: var(--ff-montserrat);
  color: var(--element-color);
}

h6 {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  font-weight: var(--fw-semibold);
  margin: 0;
  text-align: center;

  @include md {
    font-size: var(--size-7);
  }
}
</style>
