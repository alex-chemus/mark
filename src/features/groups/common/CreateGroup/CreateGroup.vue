<script lang="ts" setup>
import { defineEmits, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { Checkbox } from '@/shared'
import useCreateGroup from '@/features/groups/hooks/useCreateGroup'

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const key = inject<Key>('key')
const { getters } = useStore(key)

const {
  name, hasRoles, createGroup, shouldAttach
} = useCreateGroup()
</script>

<template>
  <form class="create-section">
    <label for="name">
      <span>Название группы</span>
      <input type="text" v-model="name" id="name" />
    </label>

    <div>
      <checkbox
        title="Роли в группе"
        :state="hasRoles"
        @toggle="hasRoles = !hasRoles"
      />
    </div>

    <div v-if="getters.roles.includes('teacher')">
      <checkbox
        title="Привязать к учреждению"
        :state="shouldAttach"
        @toggle="shouldAttach = !shouldAttach"
      />
    </div>

    <div class="button-wrapper">
      <button
        class="cancel-button"
        @click.prevent="emit('toggle')"
      >Отмена</button>
      <button
        class="create-button"
        @click.prevent="createGroup"
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
