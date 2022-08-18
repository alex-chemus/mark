<script lang="ts" setup>
import {
  defineProps, ref, inject
} from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import { useFetch } from '@/shared'
import { reloadKey } from '../keys'

const key = inject<Key>('key')
const { state, getters } = useStore(key)

const props = defineProps<{
  facultyID: number
}>()

const opened = ref(false)
const departmentName = ref('')

// eslint-disable-next-line
const reload = inject(reloadKey, () => {})
const create = async () => {
  if (!state.userInfo || departmentName.value === '') return
  await useFetch({
    path: 'markMethods/institution.addDepartment',
    data: {
      institutionID: getters.IID,
      facultyID: props.facultyID,
      departments: departmentName.value
    }
  })
  reload()
  opened.value = false
}
</script>

<template>
  <div v-if="!opened" class="add-section">
    <button class="add-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="~/feather-icons/dist/feather-sprite.svg#plus" />
      </svg>
    </button>
  </div>

  <div v-else class="add-section">
    <button class="add-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="~/feather-icons/dist/feather-sprite.svg#minus" />
      </svg>
    </button>

    <!-- eslint-disable-next-line -->
    <input type="text" placeholder="Название" v-model="departmentName" />

    <button class="create-button desktop" @click="create">Добавить</button>
    <button class="create-button mobile" @click="create">
      <svg width="19" height="19" viewBox="0 0 19 19">
        <use href="~/feather-icons/dist/feather-sprite.svg#plus" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.add-section {
  margin-top: var(--size-6);
  @include flex;
  @include gap(var(--size-6));
}

.add-button {
  @include button-icon;
}

input {
  @include input;
}

.create-button {
  @include button-hollow;
}

.desktop {
  @include sm {
    display: none;
  }
}

.mobile {
  display: none;
  padding: var(--size-2);

  @include sm {
    display: flex;
  }
}
</style>
