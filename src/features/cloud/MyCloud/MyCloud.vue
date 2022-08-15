<script lang="ts" setup>
import data from '../data';
import CloudControls from '../CloudControls/CloudControls.vue'
import Folder from '../Folder/Folder.vue'
import File from '../File/File.vue'
</script>

<template>
  <main class="my-cloud">
    <cloud-controls
      :user-can-upload="true"
      :is-root="false"
      dir-name="корневой каталог"
    />
    <folder folder-name="test" />
    <file
      url-to-file="https://cloud.findcreek.com/storage/e0a5e7b129a6e0e12c22c78b192aeb69.jpg"
      file-name="sanya"
      file-type="image"
      file-extension="jpg"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
