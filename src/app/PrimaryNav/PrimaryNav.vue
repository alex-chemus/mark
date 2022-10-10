<script lang="ts" setup>
import { Key } from '@/store';
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const key = inject<Key>('key')
const { getters } = useStore(key)

const route = useRoute()

const selectRoutes = (...routes: string[]) => {
  if (routes.includes('/')) {
    return route.path === '/' || route.path.startsWith('/groupID') ? 'selected' : ''
    //return routes.some(r => route.path.startsWith(r)) ? 'selected' : ''
  } else
    return routes.some(r => route.path.startsWith(r)) ? 'selected' : ''
}

const isAdmin = computed(() => {
  return getters.roles?.includes('administrator_of_institution')
})

const isTeacher = computed(() => {
  return getters.roles?.includes('teacher')
})
</script>

<template>
  <nav>
    <ul>
      <li :class="selectRoutes('/', '/groupID')">
        <router-link to="/">Группы</router-link>
      </li>

      <li v-if="isTeacher" :class="selectRoutes('/attendance/user')">
        <router-link to="/attendance/user">Посещаемость</router-link>
      </li>

      <li :class="selectRoutes('/cloud')">
        <router-link to="/cloud">Облако</router-link>
      </li>

      <!--<li :class="selectRoutes('/announcements')">
        <router-link to="/announcements">Объявления</router-link>
      </li>-->

      <li v-if="isAdmin" :class="selectRoutes('/institution')">
        <router-link to="/institution">Учреждение</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

nav {
  color: var(--text-color-1);
  @include flex(flex-start, stretch);
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  @include flex(flex-start, stretch);
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  transition: var(--fast);
  @include flex(stretch, stretch);

  &:hover {
    color: var(--color-accent);
  }

  a {
    color: inherit;
    text-decoration: inherit;
    outline: none;
    padding: 0 var(--size-4);
    font-weight: var(--fw-medium);
    @include flex(center, center);

    &:focus {
      color: var(--color-accent);
    }
  }
}

.selected {
  color: var(--color-accent);
  position: relative;

  &::after {
    @include underline;
    width: calc(100% - var(--size-4)*2);
    top: calc(var(--size-1) + 100%);
    left: var(--size-4);
  }
}
</style>
