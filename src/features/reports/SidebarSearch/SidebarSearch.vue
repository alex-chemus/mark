<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'

interface ITeacher {
  id: number,
  fullName: string
}

const props = defineProps<{
  teachers: ITeacher[]
}>()

const emit = defineEmits<{
  (e: 'input', teacherIDs: number[]): void
}>()

const inputVal = ref('')
const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  inputVal.value = target.value

  const result = props.teachers
    .filter(t => {
      const pattern = new RegExp(inputVal.value.toLowerCase().trim())
      return pattern.test(t.fullName.toLowerCase().trim())
    })
    .map(t => t.id)

  emit('input', result)
}
</script>

<template>
  <!-- eslint-disable-next-line -->
  <input type="text" @input="onInput" :value="inputVal" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
