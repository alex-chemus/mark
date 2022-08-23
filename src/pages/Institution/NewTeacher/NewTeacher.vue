<script lang="ts" setup>
import { defineEmits, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import useAddTeacher from '../hooks/useAddTeacher'

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const {
  firstName, lastName, patronymic, password, addTeacher
} = useAddTeacher()

const create = async () => {
  await addTeacher()
  dispatch('fetchInstituion')
  emit('toggle')
}
</script>

<template>
  <form class="teacher-registration" @submit.prevent>
    <label for="firstName">
      <span>Имя</span>
      <input type="text" v-model="firstName" id="firstName" required />
    </label>

    <label for="lastName">
      <span>Фамилия</span>
      <input type="text" v-model="lastName" id="lastName" required />
    </label>

    <label for="patronymic">
      <span>Отчество</span>
      <input type="text" v-model="patronymic" id="patronymic" />
    </label>

    <label for="patronymic">
      <span>Пароль</span>
      <input type="password" v-model="password" id="password" required />
    </label>

    <p class="note">Если оставить пустым, то автоматически сгенерируется надежный пароль</p>

    <div class="button-wrapper">
      <button class="cancel-button" @click.prevent="emit('toggle')">Отмена</button>
      <button class="create-button" @click.prevent="create">Создать</button>
    </div>
  </form>

  <!-- eslint-disable-next-line -->
  <div class="backdrop" @click="emit('toggle')" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.teacher-registration {
  @include modal;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

label {
  @include modal-label;
}

.note {
  margin-top: var(--size-3);
  padding: 0 var(--size-6);
  font-family: var(--ff-roboto);
  font-size: var(--size-4);
  color: var(--text-color-2);
}

.button-wrapper {
  margin-top: var(--size-11);
  @include flex(space-between, center);
}

.cancel-button {
  @include button-hollow;
}

.create-button {
  @include button-fill;
}
</style>
