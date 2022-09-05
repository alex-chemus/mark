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
const { getters, state } = useStore(key)

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

const inGroups = computed(() => {
  if (
    getters.roles.includes('administrator_of_institution')
    && state.institution?.groups.length === 0
  ) return false

  if (
    getters.roles.includes('teacher')
    && state.userInfo?.additionalData.inGroups.length === 0
    && state.userInfo?.additionalData.ownGroups.length === 0
  ) return false

  if (
    state.userInfo?.additionalData.inGroups.length === 0
    && !getters.roles.includes('administrator_of_institution')
  ) return false

  return true
})

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

    <template v-if="folderInfo && groupID && inGroups">
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

    <div v-else-if="getters.roles.includes('administrator_of_institution') && !inGroups" class="no-groups">
      Группы еще не созданы
    </div>

    <div v-else-if="!inGroups" class="no-groups">
      Вы не состоите ни в одной группе
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.no-groups {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  color: var(--text-color-1);
  text-align: center;

  @include md {
    font-size: var(--size-6);
  }
}

.cloud-page {
  @include container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}

.cloud-heading {
  @include flex(space-between, center);
  margin-bottom: var(--size-10);

  /*@include md {
    margin-bottom: var(--size-9);
  }*/
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
