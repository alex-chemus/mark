<script lang="ts" setup>
import { inject, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Key } from '@/store'
import { useStore } from 'vuex'

/* eslint-disable */

const key = inject<Key>('key')
const { commit } = useStore(key)

const { push } = useRouter()
const route = useRoute()

onBeforeMount(() => {
  commit('setToken', location.search.split('=')[1])
  localStorage.setItem('token', location.search.split('=')[1])
  //push({ path: '/' })
  if (!route.params.id) push({ path: '/' })
  else push({ path: `/invitation/${route.params.id as string}` })
})
</script>
