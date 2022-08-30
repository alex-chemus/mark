<script lang="ts" setup>
import { inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'
import { Key } from '@/store'
import { useStore } from 'vuex'

/* eslint-disable */

const key = inject<Key>('key')
const { commit } = useStore(key)

const { push } = useRouter()

onBeforeMount(() => {
  commit('setToken', location.search.split('=')[1])
  localStorage.setItem('token', location.search.split('=')[1])
  push({ path: '/' })
})
</script>
