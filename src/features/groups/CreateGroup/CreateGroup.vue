<script lang="ts" setup>
import { defineEmits, ref } from 'vue'
import { Checkbox } from '@/shared'

const name = ref('')
const hasRoles = ref(false)

const send = () => {} // eslint-disable-line

const onNameInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  name.value = target.value
}

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <form class="create-section">
    <label for="name">
      <span>Название группы</span>
      <input type="text" @input="onNameInput" id="name" />
    </label>

    <div>
      <checkbox
        title="Роли в группе"
        :state="hasRoles"
        @toggle="hasRoles = !hasRoles"
      />
    </div>

    <div class="button-wrapper">
      <button
        class="cancel-button"
        @click.prevent="emit('toggle')"
      >Отмена</button>
      <button
        class="create-button"
        @click.prevent="send"
      >Создать</button>
    </div>
  </form>

  <!-- eslint-disable-next-line -->
  <div class="backdrop" @click="emit('toggle')" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

.create-section {
  @include modal;
}

label {
  /*font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  color: var(--text-color-2);
  @include flex(flex-start, flex-start, column);

  span {
    margin-left: var(--size-6);
    margin-bottom: var(--size-2);
  }*/
  @include modal-label;
}

/*input[type="text"] {
  @include input;
}*/

.button-wrapper {
  @include flex(space-between, center);
  margin-top: var(--size-11);
}

.cancel-button {
  @include button-hollow;
}

.create-button {
  @include button-fill;
}
</style>
