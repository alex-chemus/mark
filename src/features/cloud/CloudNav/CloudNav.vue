<script lang="ts" setup>
import {
  ref, inject, computed, onMounted, watch
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Key } from '@/store'
import { NavItem } from '../types'
import CloudPopup from '../CloudPopup/CloudPopup.vue'

const key = inject<Key>('key')
const { getters, state } = useStore(key)

const router = useRouter()
const route = useRoute()

const currentNav = ref<NavItem | null>(null)
onMounted(() => {
  if (route.path.startsWith('/cloud/groups'))
    currentNav.value = '/cloud/groups'
  else
    currentNav.value = '/cloud/private'
})

const validate = () => {
  /*if (!state.userInfo?.additionalData.inGroups[0]) {
    router.push({ path: '/' })
  }*/
  if (!getters.roles.includes('teacher')
    && !getters.roles.includes('administrator_of_institution')
    && state.userInfo?.additionalData.inGroups.length
    && currentNav.value === '/cloud/groups'
    && route.path === '/cloud/groups'
  ) {
    router.push({ path: `/cloud/groups/${state.userInfo.additionalData.inGroups[0]}` })
  }
}
onMounted(validate)
watch([() => state.userInfo, () => route.path], validate)

const authorized = computed(() => {
  return getters.roles.includes('teacher')
    || getters.roles.includes('administrator_of_institution')
})

const setSelection = (item: NavItem) => {
  return item === currentNav.value ? 'selected' : ''
}
</script>

<template>
  <nav class="cloud-nav">
    <ul class="links-list">
      <li class="nav-link" :class="setSelection('/cloud/private')">
        <button @click="router.push({ path: `/cloud/private` })">Мое облако</button>
      </li>
      <li class="nav-link" :class="setSelection('/cloud/groups')">
        <button @click="router.push({ path: `/cloud/groups` })">Облако группы</button>
      </li>
    </ul>

    <div v-if="currentNav === '/cloud/groups' && authorized">
      <!--<p v-if="role === 'user'" class="group-name">{{ group }}</p>-->
      <cloud-popup />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-nav {
  @include flex(space-between, center);
  margin: var(--size-12) 0 var(--size-15);
  border-bottom: 1px solid var(--element-color);
  position: relative;

  @include md {
    margin: var(--size-9) 0 var(--size-11);
  }
}

.links-list {
  @include flex;
  list-style: none;
  padding: 0;
  margin: 0;
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-8));
  }
}

.nav-link button {
  @include button;

  @include md {
    font-size: var(--size-5);
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.nav-link {
  position: relative;
  padding-bottom: var(--size-3);
}

.nav-link.selected {
  button {
    color: var(--color-accent);
  }

  &::after {
    @include underline;
  }
}

.group-name {
  padding-bottom: var(--size-3);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);

  @include md {
    display: none;
  }
}
</style>
