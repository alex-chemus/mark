<script lang="ts" setup>
import {
  defineProps, onMounted, watch, computed
} from 'vue'
import { useFetchUsers } from '@/shared'
import { IGroupUsers } from '@/features/groups'
import User from '../User/User.vue'
import { IUserItem } from '../types'

const props = defineProps<{
  users?: IGroupUsers, // UIDs
  checkStatus?: (studentID: number) => 'Староста' | 'Зам. старосты' | undefined
}>()

const { users: usersData, fetchUsers } = useFetchUsers()

onMounted(() => {
  if (!props.users || props.users.length === 0) return
  //fetchUsers({ userIds: props.users.join(', ') })
  if (Array.isArray(props.users))
    fetchUsers({ userIds: props.users.join(', ') })
  else
    fetchUsers({ userIds: Object.values(props.users).join(', ') })
})

watch(
  () => props.users,
  () => {
    if (!props.users) return
    if (props.users.length === 0)
      usersData.value = []
    else {
      /* eslint-disable */
      if (Array.isArray(props.users))
        fetchUsers({ userIds: props.users.join(', ') })
      else
        fetchUsers({ userIds: Object.values(props.users).join(', ') })
      /* eslint-enable */
    }
  }
)

const getUsers = computed(() => {
  if (usersData.value === null) return null

  function compare(a: IUserItem, b: IUserItem) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  }

  return [...usersData.value].sort(compare)
})
</script>

<template>
  <ul v-if="usersData && usersData.length > 0" class="users-list">
    <li v-for="user in getUsers" :key="user.uid" class="user">
      <user
        :avatar="user.avatar"
        :full-name="user.fullName"
        :uid="user.uid"
        :badge-text="checkStatus ? checkStatus(user.uid) : undefined"
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
}
</style>
