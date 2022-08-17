<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { NavItem } from '../types'

const props = defineProps<{
  item: NavItem
}>()

const emit = defineEmits<{
  (e: 'toggle', value: NavItem): void
}>()

const setSelection = (cls: NavItem) => {
  return props.item === cls ? 'selected' : ''
}
</script>

<template>
  <nav class="secondary-nav">
    <ul>
      <li :class="setSelection('Портал')">
        <button @click="emit('toggle', 'Портал')" tabindex="">Портал</button>
      </li>
      <li :class="setSelection('Преподаватели')">
        <button @click="emit('toggle', 'Преподаватели')" tabindex="">Преподаватели</button>
      </li>
      <li :class="setSelection('Группа')">
        <button @click="emit('toggle', 'Группа')" tabindex="">Группа</button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.secondary-nav {
  @include container;
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  //margin: var(--size-12) 0 var(--size-15);

  @include md {
    //margin: var(--size-9) 0 var(--size-11);
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  @include flex(flex-start, baseline);
  @include gap(var(--size-9));
  border-bottom: 1px solid var(--element-color);

  @include md {
    @include gap(var(--size-8));
  }
}

button {
  @include button;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  @include md {
    font-size: var(--size-5);
  }
}

li {
  padding-bottom: var(--size-3);
  position: relative;

  &.selected::after {
    @include underline;
  }

  &.selected button {
    color: var(--color-accent);
  }
}
</style>
