<script lang="ts" setup>
import { inject, computed } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'

const key = inject<Key>('key')
const { getters } = useStore(key)

// todo: add mark method
const addGroup = () => {} // eslint-disable-line

const title = computed(() => {
  return getters.roles.includes('administrator_of_institution')
    ? 'Созданные'
    : 'Мои группы'
})
</script>

<template>
  <div class="wrapper">
    <h2 class="group-name">{{ title }}</h2>
    <button class="add-button">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="~/feather-icons/dist/feather-sprite.svg#plus" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.wrapper {
  @include flex(space-between, center);
}

.group-name {
  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  font-weight: var(--fs-semibold);
  color: var(--text-color-1);
}

.add-button {
  @include flex;
  color: var(--text-color-2);
  transition: var(--fast);
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}
</style>
