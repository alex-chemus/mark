<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { NavItem } from '../types'

const props = defineProps<{
  currentNav: NavItem
}>()

const emit = defineEmits<{
  (e: 'swtich', value: NavItem): void
}>()

const items = ref<NavItem[]>([
  'Структура', 'Преподаватели'
])

const setSelection = (item: NavItem) => {
  return item === props.currentNav ? 'selected' : ''
}
</script>

<template>
  <nav class="institution-nav">
    <ul class="nav-list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="nav-item"
        :class="setSelection(item)"
      >
        <button @click="emit('swtich', item)">{{ item }}</button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.institution-nav {
  @include container;
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  border-bottom: 1px solid var(--element-color);

  @include md {
    margin-bottom: var(--size-11);
    margin-top: var(--size-9);
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  @include flex;
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-8));
  }
}

.nav-item {
  padding-bottom: var(--size-3);
  position: relative;
}

.nav-item button {
  @include button;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.nav-item.selected {
  //border-bottom: 1px solid var(--color-accent);
  button {
    color: var(--color-accent);
  }

  &::after {
    @include underline;
  }
}
</style>
