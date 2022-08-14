<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { IGroupButton } from '../types';

const props = defineProps<{
  groups: IGroupButton[],
  currentGroup: number
}>()

const emit = defineEmits<{
  (e: 'switch', value: number): void
}>()

const setSelection = (id: number) => {
  return props.currentGroup === id ? 'selected' : ''
}
</script>

<template>
  <ul class="groups-list">
    <li
      v-for="group in groups"
      :key="group.id"
      :class="setSelection(group.id)"
    >
      <button @click="emit('switch', group.id)">
        {{ group.name }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.groups-list {
  @include gap(var(--size-6), 'column');
  padding: 0;
  margin: 0;
  list-style: none;
}

button {
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: var(--fast);
  font-family: var(--ff-roboto);
  font-size: var(--size-5);
  color: var(--text-color-1);

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

li.selected {
  padding-left: var(--size-2);
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 100%;
    width: 1px;
    background-color: var(--color-accent);
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
