<script lang="ts" setup>
import { ref, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex';
import useAddFaculty from '../hooks/useAddFaculty'

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const opened = ref(false)

const { facultyName, addFaculty } = useAddFaculty()

const create = async () => {
  await addFaculty()
  dispatch('fetchInstituion')
  opened.value = false
}
</script>

<template>
  <div v-if="!opened" class="add-section">
    <button class="add-button" @click="opened = !opened">
      Добавить факультет
    </button>
  </div>

  <div v-else class="add-section">
    <button class="remove-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-minus" />
      </svg>
    </button>

    <!-- eslint-disable-next-line -->
    <input type="text" placeholder="Название" v-model="facultyName" />

    <button class="create-button desktop" @click="create">Добавить</button>
    <button class="create-button mobile" @click="create">
      <svg width="19" height="19" viewBox="0 0 19 19">
        <use href="@/assets/tabler-sprite.svg#tabler-plus" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.add-section {
  //margin-top: var(--size-6);
  @include flex;
  @include gap(var(--size-6));
}

.add-button {
  @include button-hollow;
}

.remove-button {
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
