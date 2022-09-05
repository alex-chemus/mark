<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { IFolder } from '../types'

const props = defineProps<{
  folder: IFolder,
  groupID: number | string
}>()

const { push } = useRouter()

// eslint-disable-next-line
//const setFolderID = inject(setFolderIDKey, (value: number) => {})
</script>

<template>
  <button
    @click="push({ path: `/cloud/groups/${groupID}/${folder.folderID}` })"
    class="folder"
    :title="folder.folderName"
  >
    <img src="@/assets/folder2.svg" :alt="folder.folderName" />
    <p class="name">{{ folder.folderName }}</p>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.folder {
  @include card;
  border: none;
  outline: none;
  max-width: 100%;
  min-width: 0;
  width: 100%;
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
