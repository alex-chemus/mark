<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps<{
  urlToFile: string,
  fileName: string,
  fileType: string,
  fileExtension: string
}>()

const download = async () => {
  console.log('download')
  const res = await fetch(props.urlToFile)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.fileName}.${props.fileExtension}`
  a.click()
} // eslint-disable-line

const getImage = computed(() => {
  return 'image'
})
</script>

<template>
  <button @click.prevent="download" class="file">
    <img src="@/assets/image.png" :alt="fileName">
    <p class="name">{{ fileName }}</p>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.file {
  @include card;
  border: none;
  outline: none;
}
</style>
