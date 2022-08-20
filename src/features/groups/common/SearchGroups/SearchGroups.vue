<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { IGroupButton } from '@/features/groups/types'

const props = defineProps<{
  groups: IGroupButton[]
}>()

const emit = defineEmits<{
  (e: 'search', value: number[]): void, // ids[] of groups in result
}>()

const search = (e: Event) => {
  const { value } = e.target as HTMLInputElement

  if (value === '') emit('search', [])

  const result = props.groups
    .filter(group => {
      const pattern = new RegExp(value.toLowerCase().trim())
      return pattern.test(group.groupName.toLowerCase().trim())
    })
    .map(group => group.groupID)

  console.log('groups', props.groups)
  console.log('result', result)

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
  @include input;
}
</style>
