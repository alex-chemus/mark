<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { IGroupInfo } from '@/features/groups'
import useAddRobot from '../../hooks/useAddRobot'

const props = defineProps<{
  groupInfo: IGroupInfo
}>()

const emit = defineEmits<{
  (e: 'added'): void
}>()

const modalOpened = ref(false)

const {
  firstName, lastName, patronymic, addRobot
} = useAddRobot({ groupInfo: props.groupInfo })

const add = async () => {
  await addRobot()
  emit('added')
  modalOpened.value = false
}
</script>

<template>
  <button class="add-button" @click="modalOpened = !modalOpened">Добавить робота</button>
  <form v-if="modalOpened" class="modal">
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

    <div class="button-wrapper">
      <button class="cancel-button" @click.prevent="modalOpened = false">Отмена</button>
      <button class="create-button" @click.prevent="add">Создать</button>
    </div>
  </form>
  <!-- eslint-disable-next-line -->
  <div v-if="modalOpened" class="backdrop" @click="modalOpened = false" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.add-button {
  @include button-hollow;
}

.modal {
  @include modal;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

label {
  @include modal-label;
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
