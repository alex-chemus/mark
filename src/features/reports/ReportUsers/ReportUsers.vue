<script lang="ts" setup>
import {
  defineProps, defineEmits, watch, onMounted, computed, ref
} from 'vue'
import { IUserAttendance, IResponseAttendance } from '../types'
import ReportUser from '../ReportUser/ReportUser.vue'
import useUsers from '../hooks/useUsers'

const props = defineProps<{
  usersData: IResponseAttendance[],
  checkStatus?: (userID: number) => 'Староста' | 'Зам. старосты' | undefined
}>()

const emit = defineEmits<{
  (e: 'edit', userID: number): void
}>()

const { users, fetchUsers } = useUsers()
onMounted(() => fetchUsers({ usersData: props.usersData }))

const sortedUsers = ref<IUserAttendance[] | null>()
watch(users, () => {
  if (!users.value) return
  const newUsers: IUserAttendance[] = []

  for (let i = 0; i < users.value.length; i++) {
    const { userID } = props.usersData[i]
    const user = users.value.find(u => u.uid === userID)
    if (user)
      newUsers.push(user)
  }

  sortedUsers.value = newUsers
})

const updateUsers = () => {
  if (!sortedUsers.value) return
  sortedUsers.value = [...props.usersData]
    .map((user, i) => {
      return {
        uid: user.userID,
        fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`,
        avatar: sortedUsers.value![i].avatar,
        isPresent: user.isPresent
      } as IUserAttendance
    })
}
watch(() => props.usersData, updateUsers)

const getUsers = computed(() => {
  if (!sortedUsers.value) return null

  function compare(a: IUserAttendance, b: IUserAttendance) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  }

  return [...sortedUsers.value].sort(compare)
})
</script>

<template>
  <ul v-if="users" class="users-list">
    <li v-for="user in getUsers" :key="user.uid">
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
