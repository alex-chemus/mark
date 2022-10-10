<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, watch, computed
} from 'vue'
import { useFetchUsers, IUserItem } from '@/shared'
import { IGroupUsers } from '@/features/groups'
import GroupUser from '../GroupUser/GroupUser.vue'

const props = defineProps<{
  users?: IGroupUsers, // UIDs
  headStudentID?: number,
  deputyHeadStudentID?: number,
  groupID: number
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
    <group-user
      v-for="user in getUsers" :key="user.uid"
      :headStudentID="headStudentID"
      :deputyHeadStudentID="deputyHeadStudentID"
      :groupID="groupID"
      :avatar="user.avatar"
      :full-name="user.fullName"
      :uid="user.uid"
    />
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
