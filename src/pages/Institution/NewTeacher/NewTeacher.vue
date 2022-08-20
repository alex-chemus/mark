<script lang="ts" setup>
import { defineEmits, inject } from 'vue'
import { reloadKey } from '../keys'
import useAddTeacher from '../hooks/useAddTeacher'

/*const firstName = ref('')
const lastName = ref('')
const patronymic = ref('')
const password = ref('')*/

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

// eslint-disable-next-line
const reload = inject(reloadKey, () => {})
const {
  firstName, lastName, patronymic, password, addTeacher
} = useAddTeacher()

const create = async () => {
  await addTeacher()
  reload()
  emit('toggle')
}
/*const create = async () => {
  const notValid = firstName.value === '' || lastName.value === '' || password.value === ''
  if (!state.userInfo || notValid) return
  await useFetch({
    path: 'markMethods/institution.registerTeacher',
    data: {
      institutionID: getters.IID,
      firstName: firstName.value,
      lastName: lastName.value,
      patronymic: patronymic.value,
      password: password.value
    }
  })
  reload()
  emit('toggle')
}*/
</script>

<template>
  <form class="teacher-registration">
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
