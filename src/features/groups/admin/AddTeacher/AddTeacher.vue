<script lang="ts" setup>
import {
  defineProps, ref, onMounted, watch, inject, defineEmits
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import {
  useFetchUsers, User, Checkbox, IUserItem
} from '@/shared'
import { IGroupInfo } from '@/features/groups/types';
import useAddTeachers from '@/features/groups/hooks/useAddTeachers'

const props = defineProps<{
  group: number,
  groupInfo: IGroupInfo
}>()

const emit = defineEmits<{
  (e: 'add'): void
}>()

const key = inject<Key>('key')
const { state, dispatch } = useStore(key)

const { users, fetchUsers } = useFetchUsers()

const loadTeachers = async () => {
  if (state.institution) {
    const uids = state.institution.additionalData.staff.teachers.map(i => i.userID).join(', ')
    //fetchUsers({ userIds: uids, excludeIds: props.groupInfo.users.teachers })
    const { teachers } = props.groupInfo.users
    if (Array.isArray(teachers))
      fetchUsers({ userIds: uids, excludeIds: teachers })
    else fetchUsers({
      userIds: uids,
      excludeIds: Object.values(teachers)
    })
  }
}

onMounted(loadTeachers)
watch(
  () => props.groupInfo,
  loadTeachers
)

interface IListItem extends IUserItem {
  selected: boolean
}

const { teachersList, addTeachers } = useAddTeachers()
watch(users, () => { // eslint-disable-line
  if (!users.value) return null
  teachersList.value = users.value.map(teacher => ({
    ...teacher, selected: false
  } as IListItem))
})

const opened = ref(false)

const add = async () => {
  await addTeachers({ group: props.group })
  dispatch('useGroups')
  opened.value = false
}
</script>

<template>
  <div v-if="teachersList && teachersList.length" class="button-wrapper">
    <button class="add-button" @click="opened = true">Добавить</button>
  </div>

  <section v-show="opened" class="add-modal">
    <div v-for="user in teachersList" :key="user.uid" class="teacher-wrapper">
      <user
        :avatar="user.avatar"
        :full-name="user.fullName"
        :hide-on-shrink="true"
      />
      <checkbox
        :state="user.selected"
        @toggle="user.selected = !user.selected"
      />
    </div>
    <div class="button-wrapper">
      <button class="cancel-button" @click="opened = false">Отмена</button>
      <button class="fetch-button" @click="add">Добавить</button>
    </div>
  </section>

  <!-- eslint-disable-next-line -->
  <div v-show="opened" class="backdrop" @click="opened = false" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.button-wrapper {
  margin-top: var(--size-8);
}

.add-button {
  @include button-hollow;
}

.add-modal {
  @include modal;
}

.teacher-wrapper {
  @include flex(space-between, center);
  @include gap(var(--size-3));
  max-height: 70vh;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

.button-wrapper {
  @include flex(space-between, center);
  margin-top: var(--size-11);
}

.cancel-button {
  @include button-hollow;
}

.fetch-button {
  @include button-fill;
}
</style>
