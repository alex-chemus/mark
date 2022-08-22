<script lang="ts" setup>
import { defineProps, onUpdated, ref } from 'vue'

defineProps<{
  text: string
}>()

const button = ref<HTMLButtonElement | null>(null)
const close = () => {
  button.value?.classList.add('hidden')
}

onUpdated(() => {
  if (!button.value) return
  button.value.classList.remove('hidden')
  setTimeout(close, 3000)
})
</script>

<template>
  <button class="alert" ref="button" @click="close">
    <p class="text">{{ `${text} `.repeat(10) }}</p>
    <svg width="22" height="22" viewBox="0 0 22 22">
      <use href="~/feather-icons/dist/feather-sprite.svg#x" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.alert {
  display: none;
  @include button;
  position: fixed;
  z-index: 10;
  top: 2rem;
  max-width: 300px;
  width: calc(100vw - 2rem);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px;
  background-color: var(--color-accent);
  color: var(--color-neutral-1);
  padding: var(--size-6);
  //@include flex(space-between, center);
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--size-5);

  &.hidden {
    display: none;
  }
}

.text {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);

  @include md {
    font-size: var(--size-5);
  }
}

svg {
  color: inherit;

  &:hover,
  &:focus {
    color: inherit;
  }
}
</style>
