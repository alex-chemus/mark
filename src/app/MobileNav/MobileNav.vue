<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

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
</script>

<template>
  <nav class="mobile-nav">
    <ul class="nav-list">
      <li class="list-item">
        <router-link to="/" :class="selectRoutes('/', '/groupID')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-users" />
          </svg>
        </router-link>
      </li>

      <li v-if="getters.roles?.includes('teacher')" class="list-item">
        <router-link to="/attendance/user" :class="selectRoutes('/attendance/user')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-list-check" />
          </svg>
        </router-link>
      </li>

      <li class="list-item">
        <router-link to="/cloud" :class="selectRoutes('/cloud')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-cloud" />
          </svg>
        </router-link>
      </li>

      <!--<li class="list-item">
        <router-link to="/announcements" :class="setSelection('/announcements')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#bell" />
          </svg>
        </router-link>
      </li>-->

      <li v-if="getters.roles?.includes('administrator_of_institution')" class="list-item">
        <router-link to="/institution" :class="selectRoutes('/institution')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-school" />
          </svg>
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="div" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.div {
  height: 40px;
}

.mobile-nav {
  display: none;
  //@include container;
  height: 40px;
  //position: sticky;
  position: fixed;
  width: 100%;
  bottom: 0;
  //background-color: red;
  background-color: var(--bg-color-1);
  box-shadow: var(--section-shadow);

  @include md {
    @include flex(center, center);
  }
}

.nav-list {
  @include container;
  padding: 0;
  list-style: none;
  @include flex(stretch, center);
  height: 100%;

}

.list-item {
  flex-grow: 1;
  height: 100%;

  a {
    @include button-icon;
    color: var(--text-color-2);
    width: 100%;
    height: 100%;
    @include flex(center, center);

    &.selected {
      color: var(--color-accent);
    }

    &:hover,
    &:focus {
      color: var(--color-accent);
    }
  }
}
</style>
