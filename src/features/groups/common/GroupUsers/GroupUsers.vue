<script lang="ts" setup>
import {
  defineProps, defineEmits, onMounted, watch
} from 'vue'
import { useFetchUsers } from '@/shared'
import { IGroupUsers } from '@/features/groups'
import GroupUser from '../GroupUser/GroupUser.vue'

const props = defineProps<{
  users?: IGroupUsers, // UIDs
  headStudentID?: number,
  deputyHeadStudentID?: number,
  groupID: number
}>()

const emit = defineEmits<{
  (e: 'update'): void
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
</script>

<template>
  <ul v-if="usersData && usersData.length > 0" class="users-list">
    <group-user
      v-for="user in usersData" :key="user.uid"
      :user="user"
      :headStudentID="headStudentID"
      :deputyHeadStudentID="deputyHeadStudentID"
      :groupID="groupID"
      :avatar="user.avatar"
      :full-name="user.fullName"
      :uid="user.uid"
      @update="emit('update')"
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
