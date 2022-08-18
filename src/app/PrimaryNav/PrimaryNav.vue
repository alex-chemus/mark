<script lang="ts" setup>
import { Key } from '@/store';
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const key = inject<Key>('key')
const { getters } = useStore(key)

const route = useRoute()

const selectRoutes = (...routes: string[]) => {
  //console.log(routes, route.path)
  return routes.includes(route.path) ? 'selected' : ''
}

const isAdmin = computed(() => {
  return getters.roles?.includes('administrator_of_institution')
})
</script>

<template>
  <nav>
    <ul>
      <li :class="selectRoutes('/')">
        <router-link to="/">Группы</router-link>
      </li>

      <li :class="selectRoutes('/cloud')">
        <router-link to="/cloud">Облако</router-link>
      </li>

      <li :class="selectRoutes('/announcements')">
        <router-link to="/announcements">Объявления</router-link>
      </li>

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
  @include flex(flex-start, center);
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  @include flex(flex-start, baseline);
  @include gap(var(--size-9));
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  transition: var(--fast);

  &:hover {
    color: var(--color-accent);
  }

  a {
    color: inherit;
    text-decoration: inherit;
    outline: none;

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
    top: calc(100% + 19px);

    @include lg {
      top: calc(100% + 16px);
    }

    @include md {
      top: calc(100% + 9px);
    }
  }
}
</style>
