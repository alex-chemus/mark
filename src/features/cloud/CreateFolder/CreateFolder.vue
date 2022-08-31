<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, inject, onMounted, watch
} from 'vue'
import { useRoute } from 'vue-router'
import { useFetch, IError } from '@/shared'
import { Key } from '@/store'
import { useStore } from 'vuex'

const props = defineProps<{
  opened: boolean,
  groupID: number | string
}>()

const emit = defineEmits<{
  (e: 'toggle'): void,
  (e: 'created'): void
}>()

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const route = useRoute()

const folderID = ref<string | null>(null)
const updateFolderID = () => {
  if (route.params.folderID === '')
    folderID.value = null
  else
    folderID.value = route.params.folderID as string
}
onMounted(updateFolderID)
watch(() => route.params.folderID, updateFolderID)

const input = ref('')
const createFolder = async () => {
  const data = folderID?.value
    ? {
      groupID: props.groupID,
      newFolderName: input.value,
      folderID: folderID.value
    }
    : {
      groupID: props.groupID,
      newFolderName: input.value
    }

  const { error } = await useFetch({
    path: 'markMethods/groupCloud.createFolder',
    data
  })

  if (error) {
    console.log(error)
    dispatch('setError', error as IError)
  } else {
    emit('created')
    emit('toggle')
  }
}
</script>

<template>
  <form v-if="opened" class="modal" @submit.prevent>
    <label for="name">
      <span>Название папки</span>
      <input type="text" id="name" v-model="input">
    </label>
    <div class="button-wrapper">
      <button class="button-hollow" @click="emit('toggle')">Отмена</button>
      <button class="button-fill" @click="createFolder">Создать</button>
    </div>
  </form>
  <!-- eslint-disable-next-line -->
  <div v-if="opened" class="backdrop" @click="emit('toggle')" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.modal {
  @include modal;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

label {
  font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  color: var(--text-color-2);

  @include md {
    font-size: var(--size-5);
  }

  span {
    display: block;
    margin-left: var(--size-6);
    margin-bottom: var(--size-2);
  }
}

input {
  @include input;
}

.button-wrapper {
  @include flex(space-between, center);
}

.button-fill {
  @include button-fill;
}

.button-hollow {
  @include button-hollow;
}
</style>
