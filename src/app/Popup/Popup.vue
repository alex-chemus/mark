<script lang="ts" setup>
// eslint-disable-next-line
import { defineProps, defineEmits, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'

defineProps<{
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const key = inject<Key>('key')
const { state } = useStore(key)

const logout = () => {
  localStorage.removeItem('token')
  // eslint-disable-next-line
  location.href = state.redirectUrl
}
</script>

<template>
    <section v-show="opened" class="popup">
      <ul class="list">
        <li>
          <a href="https://id.findcreek.com" target="_blank">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <use href="@/assets/tabler-sprite.svg#tabler-settings" />
            </svg>
            <span>Настройки</span>
          </a>
        </li>
      </ul>

      <button class="logout-btn" @click="logout">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="@/assets/tabler-sprite.svg#tabler-logout" />
        </svg>
        <span>Выйти из аккаунта</span>
      </button>
    </section>

    <!-- eslint-disable -->
    <div 
      v-show="opened"
      class="backdrop" 
      @click="emit('toggle')"
    />
    <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.popup {
  min-width: 300px;
  width: fit-content;
  position: absolute;
  top: 100%;
  right: 0%;
  z-index: 2;
  background-color: var(--bg-color-1);
  border-radius: 0 0 var(--size-4) var(--size-4);
  overflow: hidden;
  //box-shadow: var(--element-shadow);
  border: 1px solid var(--element-color);
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: var(--size-8);
  @include flex(flex-start, flex-start, column);
  @include gap(var(--size-9), 'column');
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  //transition: var(--fast);
  outline: none;

  &:hover {
    color: var(--color-accent);
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--fast);
    outline: none;
    @include flex;
    @include gap(var(--size-2));

    &:focus {
      color: var(--color-accent)
    }
  }
}

.logout-btn {
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-1) var(--size-8);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }
}

.backdrop {
  @include backdrop;
}
</style>
