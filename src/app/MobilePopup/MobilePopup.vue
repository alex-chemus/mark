<script lang="ts" setup>
import {
  defineEmits, defineProps, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IAccountInfo } from '../types'

defineProps<{
  opened: boolean,
  accountInfo: IAccountInfo
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

const route = useRoute()

const selectRoutes = (...routes: string[]) => {
  return routes.includes(route.path) ? 'selected' : ''
}
</script>

<template>
  <transition name="mobile-popup">
    <section v-if="opened" class="mobile-popup">
      <div class="img-wrapper">
        <img :src="accountInfo.avatar" alt="Avatar" class="img" />
      </div>

      <h6 class="name">
        {{ `${accountInfo.firstName} ${accountInfo.lastName} ${accountInfo.patronymic}` }}
      </h6>

      <div class="separator" />

      <ul>
        <li :class="selectRoutes('/settings')">
          <a href="https://id.findcreek.com?from=mark" target="_blank">
            <svg width="19" height="19" viewBox="0 0 19 19">
              <use href="@/assets/tabler-sprite.svg#tabler-settings" />
            </svg>
            <span>Настройки</span>
          </a>
        </li>
      </ul>
      <button class="logout-btn" @click="logout">
        <svg width="19" height="19" viewBox="0 0 19 19">
          <use href="@/assets/tabler-sprite.svg#tabler-logout" />
        </svg>
        <span>Выйти из аккаунта</span>
      </button>
    </section>
  </transition>
  <!-- eslint-disable -->
  <transition name="mobile-backdrop">
    <div 
      v-if="opened"
      class="backdrop" 
      @click="emit('toggle')"
    />
  </transition>
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.mobile-popup {
  @include popup('right');
  height: 100vh;
  @include flex(flex-start, flex-start, column);
  @include mobile-sidebar-animation;
}

.mobile-backdrop {
  @include mobile-backdrop-animation;
}

.img-wrapper {
  padding: var(--size-10);
  padding-bottom: var(--size-2);
}

.img {
  border-radius: 100vmax;
  border: 1px solid var(--element-color);
  width: var(--size-13);
  object-fit: cover;
}

.name {
  padding: var(--size-2) var(--size-10) 0;
  margin: 0;
  font-family: var(--ff-montserrat);
  font-size: var(--size-6);
  color: var(--text-color-1);
}

ul {
  padding: var(--size-10);
  padding-top: 0;
  margin: 0;
  list-style: none;
  width: 100%;

  @include flex(flex-start, flex-start, column);
  @include gap(var(--size-7), 'column');

  /*@include md {
    @include gap(var(--size-7), 'column');
  }*/
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
  color: var(--text-color-1);
  font-weight: var(--fw-medium);
  //transition: var(--fast);
  width: 100%;

  &:hover {
    color: var(--color-accent);
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
    transition: var(--fast);
    @include flex(flex-start, center);
    @include gap(var(--size-3));
    padding: var(--size-2) 0;
    margin-top: calc(var(--size-2) * -1);

    &:focus {
      color: var(--color-accent);
    }
  }

  /*@include md {
    font-size: var(--size-5);
  }*/
}

li.selected {
  //color: var(--color-accent);
  @include sideline;
}

.separator {
  margin: var(--size-10);
  height: 1px;
  background-color: var(--element-color);
  width: 100%;
}

.backdrop {
  @include backdrop('left');
}

.logout-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  //margin-top: auto;
  //width: 100%;
  width: 70vw;
  min-width: 250px;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-3) var(--size-10);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
  font-weight: var(--fw-medium);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }

  @include md {
    font-size: var(--size-5);
  }
}
</style>
