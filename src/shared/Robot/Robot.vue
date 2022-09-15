<script lang="ts" setup>
import {
  defineProps, defineEmits, inject, ref
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'

defineProps<{
  fullName: string,
  robotID: string,
  withOptions?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', robotID: string): void
}>()

const key = inject<Key>('key')
const { state } = useStore(key)

const modalOpened = ref(false)
</script>

<template>
  <div class="robot" :class="withOptions ? 'with-options' : ''">
    <img :src="state.defaultAvatar" alt="Avatar" class="avatar" />
    <p class="name">{{ fullName }}</p>
    <button v-if="withOptions" class="button" @click="modalOpened = !modalOpened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-trash" />
      </svg>
    </button>

    <div v-if="modalOpened" class="modal">
      <h6>Удалить робота {{ fullName }}?</h6>
      <div class="button-wrapper">
        <button class="button-fill" @click="modalOpened = false">Отмена</button>
        <button class="button-hollow" @click="emit('delete', robotID)">Удалить</button>
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="backdrop" v-if="modalOpened" @click="modalOpened = false" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.robot {
  @include flex;
  @include gap(var(--size-3));

  &.with-options {
    border-radius: 100vmax;
    transition: var(--fast);
    outline-color: transparent;

    &:hover {
      background-color: var(--bg-color-1);
      outline: 1px solid var(--element-color);
    }

    &:hover .button {
      display: flex;
    }
  }
}

.avatar {
  width: var(--size-13);
  aspect-ratio: 1;
  border-radius: 100vmax;
  background-color: var(--element-color);
  flex-shrink: 0;
  border: 1px solid var(--element-color);
  object-fit: cover;

  &.hide {
    @include sm {
      display: none;
    }
  }
}

.name {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  text-align: left;

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include md {
    font-size: var(--size-5);
  }
}

.button {
  @include button;
  margin-left: auto;
  margin-right: var(--size-6);
  display: none;

  @include md {
    display: flex;
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.modal {
  @include modal;

  h6 {
    font-family: var(--ff-open-sans);
    font-size: var(--size-6);
    font-weight: var(--fw-semibold);
    color: var(--text-color-1);
    text-align: center;

    @include md {
      font-size: var(--size-5);
    }
  }
}

.button-wrapper {
  @include flex(space-between, center);
}

.button-hollow {
  @include button-hollow;
}

.button-fill {
  @include button-fill;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}
</style>
