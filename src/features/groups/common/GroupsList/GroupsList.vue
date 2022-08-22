<script lang="ts" setup>
import { defineProps, defineEmits, onMounted } from 'vue'
import { IGroupButton } from '@/features/groups/types'

const props = defineProps<{
  groups: IGroupButton[],
  currentGroup: number
}>()

onMounted(() => console.log(props.groups, props.currentGroup))

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
      :key="group.groupID"
      :class="setSelection(group.groupID)"
    >
      <button @click="emit('switch', group.groupID)">
        {{ group.groupName }}
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
  @include sideline;
}
</style>
