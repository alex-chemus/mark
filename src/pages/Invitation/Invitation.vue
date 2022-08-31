<script lang="ts" setup>
import {
  inject, onMounted, watch, ref, onBeforeMount
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch, IError } from '@/shared'
import { useStore } from 'vuex'
import { Key } from '@/store'
import useFetchInvitationInfo from './hooks/useFetchInvitationInfo'
import { IGroupInfo } from './types'

const key = inject<Key>('key')
const { dispatch, getters } = useStore(key)

const { params } = useRoute()
const router = useRouter()

onBeforeMount(() => document.title = 'Войти')

if (params.id === '' || getters.roles.includes('administrator_of_institution'))
  router.push('/notfound')

const { invitationInfo, getInvitationInfo } = useFetchInvitationInfo()
onMounted(() => {
  if (typeof params.id === 'string')
    getInvitationInfo({ invitationID: params.id })
  else
    getInvitationInfo({ invitationID: params.id[0] })
})

const groupInfo = ref<IGroupInfo | null>(null)
watch(invitationInfo, async () => {
  if (!invitationInfo.value) return
  const { response, error } = await useFetch({
    path: 'markMethods/group.getInfo',
    data: { groupsIDs: invitationInfo.value.groupID }
  })

  if (error) {
    dispatch('setError', error as IError)
    console.log(error)
  } else groupInfo.value = response[0] // eslint-disable-line
})

const join = async () => {
  const { error } = await useFetch({
    path: 'markMethods/group.join',
    data: { invitationID: params.id as string }
  })

  if (error) {
    dispatch('setError', error as IError)
    console.log(error)
  } else {
    await dispatch('fetchUserInfo')
    router.push({ path: '/' })
  }
}
</script>

<template>
  <section v-if="groupInfo" class="invitation">
    <h6 class="title">Вступить в группу {{ groupInfo.groupName }}?</h6>
    <button class="button" @click="join">Вступить</button>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.invitation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: calc(100vw - 2rem);
  background-color: var(--bg-color-1);
  @include flex(center, center, column);
  @include gap(var(--size-3), 'column');
}

.title {
  margin: 0;
  margin-bottom: var(--size-5);
  text-align: center;
  font-family: var(--ff-montserrat);
  font-size: var(--size-7);
  color: var(--text-color-1);

  @include md {
    font-size: var(--size-6);
  }
}

.button {
  @include button-fill;
}
</style>
