<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { IFile } from '../types'

const props = defineProps<{
  file: IFile
}>()

const imageType = computed(() => {
  if (props.file.fileType === 'image') return 'image'
  if (props.file.fileType === 'video') return 'video'
  if (props.file.fileType === 'audio') return 'audio'

  if (props.file.fileExtension === 'pdf') return 'pdf'

  if (
    props.file.fileExtension === 'doc' ||
    props.file.fileExtension === 'docx'
  ) return 'doc'

  if (
    props.file.fileExtension === 'xls' ||
    props.file.fileExtension === 'xlsx'
  ) return 'excel'

  if (
    props.file.fileExtension === 'ppt' ||
    props.file.fileExtension === 'pptx'
  ) return 'presentation'

  if (['zip', 'rar', '7z', 'tar'].includes(props.file.fileExtension)) return 'archive'

  return 'other'
})
</script>

<template>
  <img v-if="imageType === 'image'" src="@/assets/image.svg" alt="Image" />
  <img v-else-if="imageType === 'video'" src="@/assets/video.svg" alt="Video" />
  <img v-else-if="imageType === 'audio'" src="@/assets/audio.svg" alt="Audio" />
  <img v-else-if="imageType === 'pdf'" src="@/assets/pdf.svg" alt="PDF" />
  <img v-else-if="imageType === 'doc'" src="@/assets/doc.svg" alt="Document" />
  <img v-else-if="imageType === 'excel'" src="@/assets/excel.svg" alt="Table" />
  <img v-else-if="imageType === 'presentation'" src="@/assets/presentation.svg" alt="Presentation" />
  <img v-else-if="imageType === 'archive'" src="@/assets/archive.svg" alt="Archive" />
  <img v-else src="@/assets/other.svg" alt="Unknown" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
