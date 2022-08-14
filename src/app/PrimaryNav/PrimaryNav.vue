<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const selectRoutes = (...routes: string[]) => {
  //console.log(routes, route.path)
  return routes.includes(route.path) ? 'selected' : ''
}
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
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-accent);
    position: absolute;
    //bottom: var(--size-7);
    //top: calc(100% + var(--size-8));
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
