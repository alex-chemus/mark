<script lang="ts" setup>
import {
  ref, inject, defineProps, defineEmits
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useFetch, IError } from '@/shared'
import { fetchFolderInfoKey, folderIDKey } from '../keys'
import CreateFolder from '../CreateFolder/CreateFolder.vue'

const props = defineProps<{
  groupID: number | string,
  folderID: string | number | null
}>()

const emit = defineEmits<{
  (e: 'created'): void
}>()

const key = inject<Key>('key')
const { commit } = useStore(key)

const input = ref<HTMLInputElement | null>(null)

const attachToGroup = async (filesIDs: number[]) => {
  const data: any = {
    filesIDs,
    groupID: props.groupID
  }

  if (props.folderID && props.folderID) data.folderID = props.folderID
  console.log('data to send', data)

  const { error } = await useFetch({
    path: 'markMethods/groupCloud.addFiles', data
  })

  if (error) {
    console.log(error)
    commit('setError', error as IError)
  } else {
    emit('created')
  }
}

const uploadFiles = async () => {
  if (input.value && input.value.files?.length) {
    const form = new FormData()

    const { files } = input.value
    form.append('files', files[0])
    const { error, response } = await useFetch({
      path: 'methods/cloud.uploadFiles',
      formData: form,
      url: 'https://cloud.findcreek.com'
    })

    if (error) {
      console.log(error)
      commit('setError', error as IError)
    } else {
      attachToGroup(response[0].fileID)
    }
  } else console.log('error')
}

const clickButton = () => {
  if (input.value) input.value.click()
}

const modalOpened = ref(false)
</script>

<template>
  <section class="cloud-controls">
    <form @submit.prevent>
      <!-- eslint-disable-next-line -->
      <input type="file" ref="input" @change="uploadFiles" />
      <button class="button" @click="clickButton">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-file-plus" />
        </svg>
      </button>
    </form>

    <button class="button" @click="modalOpened = !modalOpened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-folder-plus" />
      </svg>
    </button>
    <create-folder
      :opened="modalOpened"
      :groupID="groupID"
      @toggle="modalOpened = !modalOpened"
      @created="emit('created')"
    />
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-controls {
  @include flex;
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-6));
  }
}

form {
  @include flex(flex-start, center);
}

input {
  display: none;
}

.button {
  @include button;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.text {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);
  margin-left: var(--size-5);
}

.nav-group {
  @include flex(flex-start, center);
  @include gap(var(--size-3));
  justify-self: end;

  @include md {
    justify-content: space-between;
  }
}

.dir {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);
}

.up-button {
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  @include flex;
  color: var(--text-color-2);
  cursor: pointer;
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--color-accent)
  }

  &.disabled {
    color: var(--element-color);
  }
}
</style>
