<script lang="ts" setup>
import {
  defineEmits, defineProps, computed, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IAccountInfo } from '../types'

const props = defineProps<{
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

const openClass = computed(() => {
  return props.opened ? 'opened' : ''
})
</script>

<template>
  <section v-show="opened" class="mobile-popup" :class="openClass">
    <div class="img-wrapper">
      <img :src="accountInfo.avatar" alt="Avatar" class="img" />
    </div>

    <h6 class="name">
      {{ `${accountInfo.firstName} ${accountInfo.lastName} ${accountInfo.patronymic}` }}
    </h6>

    <div class="separator" />

    <ul>
      <li :class="selectRoutes('/settings')">
        <a href="https://id.findcreek.com">
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

.mobile-popup {
  @include popup('right');
}

.img-wrapper {
  padding: var(--size-10);
  padding-bottom: var(--size-2);
}

.img {
  border-radius: 100vmax;
  border: 1px solid var(--element-color);
  width: var(--size-13);
}

.name {
  padding: var(--size-2) var(--size-10) 0;
  margin: 0;
  font-family: var(--ff-montserrat);
  font-size: var(--size-6);
}

ul {
  padding: var(--size-10);
  padding-top: 0;
  margin: 0;
  list-style: none;

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
}

.backdrop {

  @include backdrop('left');
}

.logout-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-1) var(--size-10);
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

  @include md {
    font-size: var(--size-5);
  }
}
</style>
