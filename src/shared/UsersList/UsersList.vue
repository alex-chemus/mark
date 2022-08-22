<script lang="ts" setup>
import {
  defineProps, inject, onMounted, ref, watch
} from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
//import { useFetch, useFetchUsers } from '../hooks'
import { useFetchUsers } from '@/shared'
import { IGroupUser, IUserItem } from '../types'
import GroupUser from '../GroupUser/GroupUser.vue'

const key = inject<Key>('key')
const { state, getters } = useStore(key)

/*const props = defineProps<{
  users: IGroupUser[] // todo: типизировать
}>()*/

const props = defineProps<{
  users?: number[] // UIDs
}>()

watch(
  () => props.users,
  () => console.log(props.users)
)

/*const userItems = ref<IUserItem[]>([])

const loadUsers = async () => {
  if (!props.users || props.users.length === 0) return
  const data = await useFetch({
    path: 'methods/users.getInfo',
    data: {
      userIds: props.users.join(', ')
    }
  })
  userItems.value = data.response.map((user: any) => ({
    uid: user.id,
    fullName: `${user.firstName} ${user.lastName} ${user.patronymic}`,
    avatar: user.additionalData.avatarData.avatarCompressed
  } as IUserItem))
  //console.log('new data', userItems.value)
}*/

const { users, fetchUsers } = useFetchUsers()

onMounted(() => {
  if (!props.users || props.users.length === 0) return
  fetchUsers({ userIds: props.users.join(', ') })
})

watch(
  () => props.users,
  () => {
    if (!props.users || props.users.length === 0) return
    //fetchUsers({ userIds: props.users.join(', ') })
    if (Array.isArray(props.users))
      fetchUsers({ userIds: props.users.join(', ') })
    else
      fetchUsers({ userIds: Object.values(props.users).join(', ') })
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
