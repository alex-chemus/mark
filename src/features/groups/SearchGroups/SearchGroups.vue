<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { IGroupButton } from '../types';

const props = defineProps<{
  groups: IGroupButton[]
}>()

const emit = defineEmits<{
  (e: 'search', value: number[] | null): void, // ids[] of groups in result
}>()

const search = (e: Event) => {
  const { value } = e.target as HTMLInputElement

  if (value === '') emit('search', null)

  const result = props.groups
    .filter(group => {
      const pattern = new RegExp(value.toLowerCase().trim())
      return pattern.test(group.name.toLowerCase().trim())
    })
    .map(group => group.id)

  emit('search', result)
}
</script>

<template>
  <div class="wrapper">
    <!-- eslint-disable-next-line -->
    <input type="text" @input="search" placeholder="Поиск" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.wrapper {
  padding-bottom: var(--size-9);
  border-bottom: 1px solid var(--element-color);
}

input {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);
  padding: var(--size-2) var(--size-6);
  border-radius: 100vmax;
  border: 1px solid var(--element-color);
  outline: none;
  width: 100%;
  background-color: transparent;

  @include md {
    font-size: var(--size-5);
  }
}
</style>
