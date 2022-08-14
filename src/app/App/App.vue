<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import { useStore } from 'vuex'
import { useFetch } from '@/shared'
import { IUserInfo, Key } from '@/store';
import Header from '../Header/Header.vue'

const key = inject<Key>('key')
const { commit } = useStore(key)

onMounted(() => {
  const form = new FormData()
  form.append('token', '6f885505402e53398e577dfb94274455')

  useFetch({
    path: 'methods/account.getInfo',
    form,
    callback(info) {
      commit('setUserInfo', {
        id: info.response.id,
        firstName: info.response.firstName,
        lastName: info.response.lastName,
        patronymic: info.response.patronymic,
        textID: info.response.textID,
        email: info.response.email,
        additionalData: info.response.additionalData
      } as IUserInfo)
      commit('setInfoLoaded', true)
    }
  })
})

/*watch(
  () => state.userInfo,
  () => console.log(state.userInfo)
)*/
</script>

<template>
  <Header />
  <router-view></router-view>
</template>
