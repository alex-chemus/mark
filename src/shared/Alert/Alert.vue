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
  <button class="alert hidden" ref="button" @click="close">
    {{ text }}
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
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  text-align: left;

  @include md {
    font-size: var(--size-5);
  }

  &.hidden {
    display: none;
  }
}
</style>
