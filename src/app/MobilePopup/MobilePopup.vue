<script lang="ts" setup>
import {
  defineEmits, defineProps, computed, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const props = defineProps<{
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
    <ul>
      <li :class="selectRoutes('/profile')">
        <router-link to="/profile">
          <span>Профиль</span>
          <!--<svg width="19" height="19" viewBox="0 0 19 19">
            <use href="~/feather-icons/dist/feather-sprite.svg#user" />
          </svg>-->
        </router-link>
      </li>
      <li :class="selectRoutes('/friends')">
        <router-link to="/friends">
          <span>Друзья</span>
          <!--<svg width="19" height="19" viewBox="0 0 19 19">
            <use href="~/feather-icons/dist/feather-sprite.svg#users" />
          </svg>-->
        </router-link>
      </li>
      <li :class="selectRoutes('/support')">
        <router-link to="/support">
          <span>Поддержка</span>
          <!--<svg width="19" height="19" viewBox="0 0 19 19">
            <use href="~/feather-icons/dist/feather-sprite.svg#alert-circle" />
          </svg>-->
        </router-link>
      </li>
      <li :class="selectRoutes('/settings')">
        <router-link to="/settings">
          <span>Настройки</span>
          <!--<svg width="19" height="19" viewBox="0 0 19 19">
            <use href="~/feather-icons/dist/feather-sprite.svg#settings" />
          </svg>-->
        </router-link>
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

ul {
  padding: var(--size-10);
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
    @include flex(space-between, center);

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
  margin: 0 var(--size-10);
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
