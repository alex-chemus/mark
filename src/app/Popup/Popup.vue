<script lang="ts" setup>
// eslint-disable-next-line
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const logout = () => {} // eslint-disable-line

const openClass = computed(() => {
  return props.opened ? 'opened' : ''
})
</script>

<template>
    <section v-show="opened" class="popup" :class="openClass">
      <ul class="list">
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <use href="~/feather-icons/dist/feather-sprite.svg#user" />
            </svg>
            <span>Профиль</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <use href="~/feather-icons/dist/feather-sprite.svg#users" />
            </svg>
            <span>Друзья</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <use href="~/feather-icons/dist/feather-sprite.svg#alert-circle" />
            </svg>
            <span>Подержка</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22">
              <use href="~/feather-icons/dist/feather-sprite.svg#settings" />
            </svg>
            <span>Настройки</span>
          </router-link>
        </li>
      </ul>

      <button class="logout-btn" @click="logout">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#log-out" />
        </svg>
        <span>Выйти из аккаунта</span>
      </button>
    </section>

    <!-- eslint-disable -->
    <div 
      v-show="opened"
      class="backdrop" 
      :class="openClass"
      @click="emit('toggle')"
    />
    <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.popup {
  display: none;
  //width: max(300px, fit-content);
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

  &.opened {
    display: block
  }
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: var(--size-9);
  @include flex(flex-start, flex-start, column);
  @include gap(var(--size-8), 'column');
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
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
  padding: var(--size-1) var(--size-9);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }
}

.backdrop {
  display: none;
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  cursor: pointer;
  //background-color: rgba(0 0 0 / .15);

  &.opened {
    display: block;
  }
}
</style>
