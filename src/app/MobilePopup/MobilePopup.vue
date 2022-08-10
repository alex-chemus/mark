<script lang="ts" setup>
// eslint-disable-next-line
import { ref, defineEmits, defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const route = useRoute()

const selectRoutes = (...routes: string[]) => {
  return routes.includes(route.path) ? 'selected' : ''
}

const navItems = [
  { route: '/', title: 'Группы' },
  { route: '/cloud', title: 'Облако' },
  { route: '/announcements', title: 'Объявления' }
]

const account = [
  { route: '/profile', title: 'Профиль' },
  { route: '/friends', title: 'Друзья' },
  { route: '/support', title: 'Поддержка' },
  { route: '/settings', title: 'Настройки' }
]

const openClass = computed(() => {
  return props.opened ? 'opened' : ''
})
</script>

<template>
  <section v-show="opened" class="mobile-popup" :class="openClass">
    <ul>
      <li v-for="(item, i) in navItems" :key="i" :class="selectRoutes(item.route)">
        <router-link :to="item.route">{{ item.title }}</router-link>
      </li>
    </ul>
    <div class="separator" />
    <ul>
      <li :class="selectRoutes('/profile')">
        <router-link to="/profile">
          <span>Профиль</span>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="~/feather-icons/dist/feather-sprite.svg#user" />
          </svg>
        </router-link>
      </li>
      <li :class="selectRoutes('/friends')">
        <router-link to="/friends">
          <span>Друзья</span>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="~/feather-icons/dist/feather-sprite.svg#users" />
          </svg>
        </router-link>
      </li>
      <li :class="selectRoutes('/support')">
        <router-link to="/support">
          <span>Поддержка</span>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="~/feather-icons/dist/feather-sprite.svg#alert-circle" />
          </svg>
        </router-link>
      </li>
      <li :class="selectRoutes('/settings')">
        <router-link to="/settings">
          <span>Настройки</span>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="~/feather-icons/dist/feather-sprite.svg#settings" />
          </svg>
        </router-link>
      </li>
    </ul>
    <button class="logout-btn">
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

.mobile-popup {
  position: fixed;
  right: 0;
  top: 0;
  width: 70vw;
  min-width: 270px;
  height: 100%;
  z-index: 2;
  background-color: var(--bg-color-1);
}

ul {
  padding: var(--size-9);
  margin: 0;
  list-style: none;

  @include flex(flex-start, flex-start, column);
  @include gap(var(--size-8), 'column');
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
}

li.selected {
  //color: var(--color-accent);
  padding-left: var(--size-2);
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-accent);
    position: absolute;
    top: 0;
    left: 0;
  }
}

.separator {
  margin: 0 var(--size-9);
  height: 1px;
  background-color: var(--element-color);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0 0 0 / .15);
  cursor: pointer;
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
</style>
