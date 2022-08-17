<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

const firstName = ref('')
const onFirstNameInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  firstName.value = value
}

const lastName = ref('')
const onLastNameInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  lastName.value = value
}

const patronymic = ref('')
const onPatronymicInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  patronymic.value = value
}

const password = ref('')
const onPasswordInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement
  password.value = value
}

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <form class="teacher-registration">
    <label for="firstName">
      <span>Имя</span>
      <input
        type="text"
        :value="firstName"
        @input="onFirstNameInput"
        id="firstName"
      />
    </label>

    <label for="lastName">
      <span>Фамилия</span>
      <input
        type="text"
        :value="lastName"
        @input="onLastNameInput"
        id="lastName"
      />
    </label>

    <label for="patronymic">
      <span>Отчество</span>
      <input
        type="text"
        :value="patronymic"
        @input="onPatronymicInput"
        id="patronymic"
      />
    </label>

    <label for="patronymic">
      <span>Пароль</span>
      <input
        type="password"
        :value="password"
        @input="onPasswordInput"
        id="password"
      />
    </label>

    <p class="note">Если оставить пустым, то автоматически сгенерируется надежный пароль</p>

    <div class="button-wrapper">
      <button class="cancel-button">Отмена</button>
      <button class="create-button">Создать</button>
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
