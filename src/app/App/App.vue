<script lang="ts" setup>
import { inject, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useFetch } from '@/shared'
import { IUserInfo, Key } from '@/store'

import { Loader } from '@/features/loader'
import Header from '../Header/Header.vue'

const key = inject<Key>('key')
const { commit, state } = useStore(key)

onMounted(() => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token') as string
    commit('setToken', token)

    useFetch({ path: 'markMethods/account.getInfo' })
      .then(info => {
        commit('setUserInfo', {
          id: info.response.findcreekID,
          additionalData: info.response.additionalData,
          institutionData: info.response.institutionData,
          portfolio: info.response.portfolio
        } as IUserInfo)
      })
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
