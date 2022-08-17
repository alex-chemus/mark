<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'

defineProps<{
  faculty: string
}>()

defineEmits<{
  (e: 'add'): void
}>()

const create = () => {} // eslint-disable-line

const opened = ref(false)
</script>

<template>
  <div v-if="!opened" class="add-section">
    <button class="add-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="~/feather-icons/dist/feather-sprite.svg#plus" />
      </svg>
    </button>
  </div>

  <div v-else class="add-section">
    <button class="add-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="~/feather-icons/dist/feather-sprite.svg#minus" />
      </svg>
    </button>

    <!-- eslint-disable-next-line -->
    <input type="text" placeholder="Название" />

    <button class="create-button desktop" @click="create">Добавить</button>
    <button class="create-button mobile" @click="create">
      <svg width="19" height="19" viewBox="0 0 19 19">
        <use href="~/feather-icons/dist/feather-sprite.svg#plus" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.add-section {
  margin-top: var(--size-6);
  @include flex;
  @include gap(var(--size-6));
}

.add-button {
  @include button-icon;
}

input {
  @include input;
}

.create-button {
  @include button-hollow;
}

.desktop {
  @include sm {
    display: none;
  }
}

.mobile {
  display: none;
  padding: var(--size-2);

  @include sm {
    display: flex;
  }
}
</style>
