<script lang="ts" setup>
import { inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { Key } from '@/store'
import { useStore } from 'vuex'

/* eslint-disable */
console.log('token: ', location.search.split('=')[1])
console.log('should set token: ', location.search.split('=')[1])

const key = inject<Key>('key')
const { commit } = useStore(key)

const { push } = useRouter()

onBeforeMount(() => {
  console.log('onBeforeMount')
  commit('setToken', location.search.split('=')[1])
  localStorage.setItem('token', location.search.split('=')[1])
  push({ path: '/' })
})
</script>
