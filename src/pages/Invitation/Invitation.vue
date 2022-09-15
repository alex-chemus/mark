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
const { dispatch, getters, state } = useStore(key)

const { params } = useRoute()
const router = useRouter()

onBeforeMount(() => document.title = 'Войти')

onBeforeMount(() => {
  if (params.id === '' || getters.roles?.includes('administrator_of_institution'))
    router.push('/notfound')
})

const { invitationInfo, getInvitationInfo } = useFetchInvitationInfo()
onMounted(() => {
  if (typeof params.id === 'string')
    getInvitationInfo({ invitationID: params.id })
  else
    getInvitationInfo({ invitationID: params.id[0] })
})

const groupInfo = ref<IGroupInfo | null>(null)
const getGroupInfo = async () => {
  // for a student
  if (invitationInfo.value && state.userInfo) {
    if (
      state.userInfo.additionalData.inGroups.includes(invitationInfo.value.groupID)
      && !getters.roles.includes('teacher')
    ) {
      router.push({ path: '/' })
      return
    }
  }

  // for a teacher
  if (invitationInfo.value && state.userInfo) {
    if (
      state.userInfo.additionalData.inGroups.includes(invitationInfo.value.groupID)
      || state.userInfo.additionalData.ownGroups.includes(invitationInfo.value.groupID)
    ) {
      router.push({ path: `/groupID/${invitationInfo.value.groupID}` })
      return
    }
  }

  if (!invitationInfo.value) return
  const { response, error } = await useFetch({
    path: 'markMethods/group.getInfo',
    data: { groupsIDs: invitationInfo.value.groupID }
  })

  if (error) {
    dispatch('setError', error as IError)
    console.log(error)
  } else groupInfo.value = response[0] // eslint-disable-line
}
watch([invitationInfo, () => state.userInfo], getGroupInfo)

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
    await dispatch('fetchInstituion')
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
