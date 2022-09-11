<script lang="ts" setup>
import {
  defineProps, onMounted, watch, computed
} from 'vue'
import { IResponseAttendance, IUserAttendance } from '../types'
import useUsers from '../hooks/useUsers'
import PresenceUser from '../PresenceUser/PresenceUser.vue'

const props = defineProps<{
  usersData: IResponseAttendance[],
  checkStatus?: (userID: number) => 'Староста' | 'Зам. старосты' | undefined,
  filter: 'all' | 'present' | 'absent'
}>()

const { users, fetchUsers } = useUsers()

onMounted(() => fetchUsers({ usersData: props.usersData }))
watch(
  () => props.usersData,
  () => fetchUsers({ usersData: props.usersData })
)

const getStudents = computed(() => {
  function compare(a: IUserAttendance, b: IUserAttendance) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  }

  if (!users.value) return null
  if (props.filter === 'absent')
    return [...users.value.filter(s => !s.isPresent)].sort(compare)
  if (props.filter === 'present')
    return [...users.value.filter(s => s.isPresent)].sort(compare)
  return [...users.value].sort(compare)
})
</script>

<template>
  <ul v-if="users" class="users-list">
    <li v-for="user in getStudents" :key="user.uid" class="user">
      <presence-user
        :avatar="user.avatar"
        :full-name="user.fullName"
        :uid="user.uid"
        :badge-text="checkStatus ? checkStatus(user.uid) : undefined"
        :is-present="user.isPresent"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.users-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include gap(var(--size-8), 'column');

  @include md {
    @include gap(var(--size-6), 'column');
  }
}
</style>
