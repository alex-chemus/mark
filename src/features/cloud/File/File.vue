<script lang="ts" setup>
import { defineProps } from 'vue'
import { IFile } from '../types'
import FileImg from '../FileImg/FileImg.vue'

defineProps<{
  file: IFile
}>()

/*const download = async () => {
  console.log('download')
  const res = await fetch(props.urlToFile)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.fileName}.${props.fileExtension}`
  a.click()
}*/ // eslint-disable-line

</script>

<template>
  <a :href="file.urlToFile" target="_blank" class="file" :title="file.fileName">
    <!--<img src="@/assets/image.png" :alt="file.fileName">-->
    <file-img :file="file" />
    <p class="name">{{ file.fileName }}.{{ file.fileExtension }}</p>
  </a>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.file {
  @include card;
  border: none;
  outline: none;
  text-decoration: none;
  max-width: 100%;
  min-width: 0;
}

.name {
  max-width: 100%;

  @media (min-width: $md) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @include md {
    text-overflow: auto;
    white-space: wrap;
    word-break: break-all;
    text-align: left;
  }
}
</style>
