<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const key = inject<Key>('key')
const { getters } = useStore(key)
const route = useRoute()

const linksList = computed(() => {
  const list = [
    ['/', 'users', '1'],
    ['/cloud', 'cloud', '2'],
    ['/announcements', 'bell', '3']
  ]

  if (getters.roles?.includes('administrator_of_institution'))
    list.push(['/institution', 'edit', '4'])

  return list
})

const setSelection = (r: string) => {
  return route.path === r ? 'selected' : ''
}
</script>

<template>
  <nav class="mobile-nav">
    <ul class="nav-list">
      <!--<li v-for="[route, img, i] in linksList" :key="i" class="list-item">
        <router-link :to="route" :class="setSelection(route)">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use :href="`~/feather-icons/dist/feather-dist.svg#${img}`" />
          </svg>
        </router-link>
      </li>-->
      <li class="list-item">
        <router-link to="/" :class="setSelection('/')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#users" />
          </svg>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/cloud" :class="setSelection('/cloud')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#cloud" />
          </svg>
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/announcements" :class="setSelection('/announcements')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#bell" />
          </svg>
        </router-link>
      </li>
      <li v-if="getters.roles?.includes('administrator_of_institution')" class="list-item">
        <router-link to="/institution" :class="setSelection('/institution')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#edit" />
          </svg>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.mobile-nav {
  display: none;
  //@include container;
  height: 40px;
  position: sticky;
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
  @include flex(space-around, center);
}

.list-item {
  a {
    @include button-icon;
    color: var(--text-color-2);

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
