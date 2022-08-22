<script lang="ts" setup>
import { inject, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { IInstitution, useFetch } from '@/shared'
import { IUserInfo, Key } from '@/store'

import { Loader } from '@/features/loader'
import Header from '../Header/Header.vue'

const key = inject<Key>('key')
const { commit, state, getters } = useStore(key)

const fetchUserInfo = async () => {
  const { response } = await useFetch({ path: 'markMethods/account.getInfo' })
  commit('setUserInfo', {
    id: response.findcreekID,
    additionalData: response.additionalData,
    institutionData: response.institutionData,
    portfolio: response.portfolio
  } as IUserInfo)
}

const fetchInstitution = async () => {
  if (!getters.IID) return
  const { response } = await useFetch({
    path: 'markMethods/institution.getInfo',
    data: { institutionID: getters.IID }
  })
  commit('setInstitution', response as IInstitution)
}

onMounted(async () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token') as string
    commit('setToken', token)

    await fetchUserInfo()
    await fetchInstitution()
    /*.then(info => {
        commit('setUserInfo', {
          id: info.response.findcreekID,
          additionalData: info.response.additionalData,
          institutionData: info.response.institutionData,
          portfolio: info.response.portfolio
        } as IUserInfo)
      })*/
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
