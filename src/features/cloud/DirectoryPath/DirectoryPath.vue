<script lang="ts" setup>
import {
  defineProps, inject, ref, onMounted, watch, computed
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useFetch, IError } from '@/shared'
import { IFolder } from '../types'

const props = defineProps<{
  groupID: number | string,
  folderID: number | string | null
}>()

const router = useRouter()

const key = inject<Key>('key')
const { dispatch, getters } = useStore(key)

const catalogs = ref<IFolder[] | null>(null)
const fetchCatalogs = async () => {
  if (!props.folderID) {
    catalogs.value = [
      {
        folderID: 0,
        folderName: 'Корневой каталог'
      }
    ]
    return
  }

  const { response, error } = await useFetch({
    path: 'markMethods/groupCloud.getFolderPath',
    data: {
      groupID: props.groupID,
      folderID: props.folderID
    }
  })

  if (error) {
    console.log(error)
    dispatch('setError', error as IError)
  } else {
    catalogs.value = response
  }
}

onMounted(fetchCatalogs)
watch(() => props.folderID, fetchCatalogs)

const push = (folderID: number | string | null) => {
  if (folderID === null) return
  router.push({ path: `/cloud/groups/${props.groupID}/${folderID}` })
}

const up = () => {
  if (!catalogs.value) return
  const { folderID } = catalogs.value[catalogs.value.length - 2]
  router.push({ path: `/cloud/groups/${props.groupID}/${folderID}` })
}

const shouldHide = computed(() => {
  if (!getters.roles) return false
  return getters.roles.includes('teacher')
    || getters.roles.includes('administrator_of_institution')
})
</script>

<template>
  <section v-if="catalogs && catalogs.length > 3" class="directory-path">
    <div class="directory" :class="shouldHide ? 'hide' : ''">
      <button
        @click="push(catalogs![0].folderID)"
        :title="catalogs[0].folderName"
      >
        {{ catalogs[0].folderName }}
      </button>
    </div>
    <div class="directory" :class="shouldHide ? 'hide' : ''">
      <span>/</span>
      <span>...</span>
    </div>
    <div class="directory" :class="shouldHide ? 'hide' : ''">
      <span>/</span>
      <button
        @click="push(catalogs![catalogs!.length-2].folderID)"
        :title="catalogs![catalogs!.length-2].folderName"
      >
        {{ catalogs[catalogs.length-2].folderName }}
      </button>
    </div>
    <div class="directory">
      <span>/</span>
      <button
        @click="push(catalogs![catalogs!.length-1].folderID)"
        :title="catalogs![catalogs!.length-2].folderName"
      >
        {{ catalogs[catalogs.length-1].folderName }}
      </button>
    </div>
    <button class="button-up" @click="up">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-corner-up-left" />
      </svg>
    </button>
  </section>

  <section v-else-if="catalogs" class="directory-path">
    <div
      v-for="(catalog, i) in catalogs" :key="i"
      class="directory"
      :class="shouldHide && i !== catalogs.length-1 ? 'hide' : ''"
    >
      <span v-if="i !== 0">/</span>
      <button @click="push(catalog.folderID)" :title="catalog.folderName">{{ catalog.folderName }}</button>
    </div>
    <button class="button-up" @click="up" :class="catalogs.length<2 ? 'disabled' : ''">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-corner-up-left" />
      </svg>
    </button>
  </section>

  <section v-if="catalogs" class="directory-path-mobile">
    <div v-if="!shouldHide" class="directory --no-gap">
      <span>{{ catalogs[catalogs.length-1].folderName }}</span>
    </div>
    <button class="button-up" @click="up" :class="catalogs.length<2 ? 'disabled' : ''">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-corner-up-left" />
      </svg>
    </button>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.directory-path-mobile {
  display: none;
  width: 100%;

  @include md {
    @include flex(space-between, center);
  }
}

.directory-path {
  @include md {
    //width: 100%;
    //align-items: center !important;
    display: none !important;
  }
}

.directory-path,
.directory {
  @include flex(flex-start, baseline);
  //@include gap(var(--size-1));
  & > *:not(:last-child) {
    margin-right: var(--size-1);
  }
}

.directory {
  font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  color: var(--text-color-2);
}

.directory.hide {
  @include md {
    display: none;
  }
}

.directory button {
  @include button;
  display: inline;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.button-up {
  display: none;
  margin-left: auto;

  @include md {
    @include button;
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  &.disabled {
    color: var(--element-color) !important;
  }
}
</style>
