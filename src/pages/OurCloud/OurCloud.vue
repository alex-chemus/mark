<script lang="ts" setup>
import {
  ref, onBeforeMount, onMounted, watch, computed, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  CloudNav, DirectoryPath, CloudControls, Folder, File
} from '@/features/cloud'
import useFolderInfo from './hooks/useFolderInfo'

const route = useRoute()

const key = inject<Key>('key')
const { getters } = useStore(key)

const folderID = ref<string | null>(null)
const updateFolderID = () => {
  if (route.params.folderID === '' || route.params.folderID === '0')
    folderID.value = null
  else
    folderID.value = route.params.folderID as string
}
onMounted(updateFolderID)
watch(() => route.params.folderID, updateFolderID)

const groupID = ref<string | null>(null)
const updateGroupID = () => {
  if (route.params.groupID === '')
    groupID.value = null
  else
    groupID.value = route.params.groupID as string
}
onMounted(updateGroupID)
watch(() => route.params.groupID, updateGroupID)

const { folderInfo, fetchFolderInfo } = useFolderInfo()
const updateInfo = () => {
  if (groupID.value) {
    fetchFolderInfo({
      groupID: route.params.groupID as string,
      folderID: folderID.value
    })
  }
}
onMounted(updateInfo)
watch([groupID, folderID], updateInfo)

const authorized = computed(() => {
  return getters.roles.includes('teacher')
    || getters.roles.includes('administrator_of_institution')
})

// eslint-disable-next-line
onBeforeMount(() => document.title = 'Облако группы')
</script>

<template>
  <main class="cloud-page">
    <cloud-nav />

    <template v-if="folderInfo && groupID">
      <section class="cloud-heading" :class="authorized ? 'hide-path' : ''">
        <directory-path
          :groupID="groupID"
          :folderID="folderID"
        />
        <cloud-controls
          v-if="authorized"
          :groupID="groupID"
          :folderID="folderID"
          @created="updateInfo"
        />
      </section>

      <section class="content-grid">
        <folder
          v-for="folder in folderInfo.folders"
          :key="folder.folderName"
          :folder="folder"
          :groupID="groupID"
        />
      </section>

      <div class="separator" v-if="folderInfo.folders.length && folderInfo.files.length" />

      <section v-if="folderInfo" class="content-grid --margin">
        <file
          v-for="file in folderInfo.files"
          :key="file.fileName"
          :file="file"
        />
      </section>
    </template>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-page {
  @include container;
}

.cloud-heading {
  @include flex(space-between, center);
  margin-bottom: var(--size-10);

  @include md {
    margin-bottom: var(--size-9);
  }
}

.cloud-heading.hide-path {
  @include md {
    flex-direction: row-reverse;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: min-content;
  grid-gap: var(--size-10);
  //width: fit-content;
  //max-width: 100%;
  //@include container;
  min-width: 0;

  @include lg {
    grid-template-columns: repeat(4, 1fr);
  }

  @include md {
    display: block;
    @include gap(var(--size-9), 'column');
  }
}

.content-grid.--margin {
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}

.separator {
  width: 100%;
  height: 1px;
  background-color: var(--element-color);
  margin: var(--size-9) 0;

  @include md {
    margin: var(--size-4) 0;
  }
}
</style>
