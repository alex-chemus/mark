<script lang="ts" setup>
</script>

<template>
  <section class="wrapper">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <use href="@/assets/tabler-sprite.svg#tabler-settings" />
    </svg>
    <h6>На сайте ведутся технические работы</h6>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.wrapper {
  @include container;
  @include flex(center, center, column);
  height: 100%;
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

svg {
  color: var(--text-color-2);
  margin-bottom: var(--size-4);
  @media (prefers-reduced-motion: no-preference) {
    animation: rotation 5s infinite;
    animation-timing-function: linear;
  }
}

@keyframes rotation {
  0% {
    transform: none;
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
