<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<template>
  <section v-if="isOpen" class="leave-warning">
    <svg width="40" height="40" viewBox="0 0 40 40">
      <use href="~/feather-icons/dist/feather-sprite.svg#alert-triangle" />
    </svg>

    <p>Вы уверены, что хотите покинуть гурппу?</p>

    <div class="button-wrapper">
      <button class="button-hollow">Покинуть</button>
      <button class="button-fill" @click="emit('cancel')">Остаться</button>
    </div>
  </section>
  <!-- eslint-disable -->
  <div
    v-if="isOpen"
    class="backdrop"
    @click="emit('cancel')"
  />
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.leave-warning {
  @include modal(4);

  svg {
    color: var(--color-accent);
  }
}

.backdrop {
  @include backdrop(3);
  background-color: rgb(0 0 0 / .3);
}

p {
  font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  font-weight: var(--fw-semibold);
  color: var(--text-color-1);
}

.button-wrapper {
  @include flex(space-between, center);
  width: 100%;
}

.button-hollow {
  @include button-hollow;
}

.button-fill {
  @include button-fill;
}
</style>
