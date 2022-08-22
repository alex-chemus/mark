<script lang="ts" setup>
import { defineProps, onMounted, watch } from 'vue'
import { useFetchUsers } from '@/shared'
import GroupUser from '../GroupUser/GroupUser.vue'

const props = defineProps<{
  users?: number[] // UIDs
}>()

const { users, fetchUsers } = useFetchUsers()

onMounted(() => {
  if (!props.users || props.users.length === 0) return
  fetchUsers({ userIds: props.users.join(', ') })
})

watch(
  () => props.users,
  () => {
    if (!props.users || props.users.length === 0) return
    fetchUsers({ userIds: props.users.join(', ') })
  }
)
</script>

<template>
  <ul v-if="users?.length > 0" class="users-list">
    <li v-for="user in users" :key="user.uid" class="user">
      <group-user
        :avatar="user.avatar"
        :full-name="user.fullName"
        :uid="user.uid"
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
