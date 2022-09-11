<script lang="ts" setup>
import {
  defineProps, onUpdated, ref, watch
} from 'vue'

const props = defineProps<{
  text: string,
  observer?: any
}>()

const button = ref<HTMLButtonElement | null>(null)
const close = () => {
  button.value?.classList.add('hidden')
}

const showAlert = () => {
  if (!button.value) return
  button.value.classList.remove('hidden')
  setTimeout(close, 4000)
}

onUpdated(showAlert)
watch(() => props.text, showAlert)
</script>

<template>
  <button class="alert hidden" ref="button" @click="close" :title="text">
    <span>{{ text }}</span>
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

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @include md {
    font-size: var(--size-5);
  }

  &.hidden {
    display: none;
  }
}
</style>
