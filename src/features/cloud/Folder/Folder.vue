<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps<{
  folderName: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button @click="emit('click')" class="folder">
    <img src="@/assets/folder.png" :alt="folderName" />
    <p class="name">{{ folderName }}</p>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.folder {
  @include card;
  border: none;
  outline: none;
}
</style>
