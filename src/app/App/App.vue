<script lang="ts" setup>
import { inject, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'

import { Loader } from '@/features/loader'
import Header from '../Header/Header.vue'

const key = inject<Key>('key')
const { dispatch, state, commit } = useStore(key)

onMounted(async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token') as string
    commit('setToken', token)

    await dispatch('fetchUserInfo')
    await dispatch('fetchInstituion')
  } else {
    // todo: reidrect to auth page
  }
})

const loaded = computed(() => {
  return !!state.userInfo
})
</script>

<template>
  <Header />
  <div v-if="loaded">
    <router-view />
  </div>
  <loader v-else />
</template>
