<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  title: string,
  state: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button class="checkbox" @click="emit('toggle')">
    <div class="field">
      <svg v-show="state" width="22" height="22" viewBox="0 0 22 22">
        <use href="~/feather-icons/dist/feather-sprite.svg#check" />
      </svg>
    </div>
    <p>{{ title }}</p>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.checkbox {
  @include button;
  @include gap(var(--size-3));
}

.field {
  aspect-ratio: 1;
  height: 22px;
  //border: 1px solid var(--text-color-2);
  box-shadow: 0 0 0 1px var(--element-color);
  color: var(--color-accent);
  border-radius: 3px;
  transition: var(--fast);

  &:hover,
  &:focus {
    box-shadow: 0 0 0 1px var(--text-color-2);
  }
}

p {
  font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  color: var(--text-color-2);

  @include md {
    font-size: var(--size-5);
  }
}
</style>
