<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, watch, onMounted, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { IError, useFetch } from '@/shared'
import { IUserAttendance, IResponseAttendance } from '../types'
import ReportUser from '../ReportUser/ReportUser.vue'

const props = defineProps<{
  usersData: IResponseAttendance[],
  checkStatus?: (userID: number) => 'Староста' | 'Зам. старосты' | undefined
}>()

const emit = defineEmits<{
  (e: 'edit', userID: number): void
}>()

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const users = ref<IUserAttendance[] | null>(null)
const setUsers = async () => {
  const { response, error } = await useFetch({
    path: 'methods/users.getInfo',
    data: {
      userIds: props.usersData.map(u => u.userID)
    }
  })

  if (error) {
    dispatch('setError', error as IError)
    console.log(error)
  } else {
    users.value = response.map((user: any) => ({
      uid: +user.id,
      fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`,
      avatar: user.additionalData.avatarData.avatarCompressed,
      isPresent: props.usersData.some(u => u.userID === +user.id && u.isPresent)
    } as IUserAttendance))
    console.log(users.value)
  }
}
onMounted(setUsers)

const updateUsers = () => {
  if (!users.value) return
  users.value = props.usersData.map((user, i) => {
    return {
      uid: user.userID,
      fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`,
      avatar: users.value![i].avatar,
      isPresent: user.isPresent
    } as IUserAttendance
  })
}
watch(() => props.usersData, updateUsers)
</script>

<template>
  <ul v-if="users" class="users-list">
    <li v-for="user in users" :key="user.uid">
      <report-user
        :avatar="user.avatar"
        :full-name="user.fullName"
        :uid="user.uid"
        :badge-text="checkStatus ? checkStatus(user.uid) : undefined"
        :is-present="user.isPresent"
        @toggle="emit('edit', user.uid)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
