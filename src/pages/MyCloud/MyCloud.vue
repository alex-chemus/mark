<script lang="ts" setup>
import { CloudNav } from '@/features/cloud'
</script>

<template>
  <div class="nav">
    <cloud-nav />
  </div>
  <div class="no-cloud">На сайте ведутся технические работы</div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.nav {
  @include container;
}

.no-cloud {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  color: var(--text-color-1);
  text-align: center;

  @include md {
    font-size: var(--size-6);
  }
}
</style>
