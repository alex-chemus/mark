<script lang="ts" setup>
import {
  defineProps, ref, onMounted, watch, defineEmits
} from 'vue'
import {
  useFetchInstitution, useFetchUsers, GroupUser, Checkbox, IUserItem
} from '@/shared'
import useAddTeachers from '@/features/groups/hooks/useAddTeachers'

const props = defineProps<{
  group: number
}>()

const emit = defineEmits<{
  (e: 'reload'): void
}>()

const { institutionInfo, fetchInfo } = useFetchInstitution()
const { users, fetchUsers } = useFetchUsers()
onMounted(async () => {
  const info = await fetchInfo()
  if (info) {
    const uids = info.additionalData.staff.teachers.map(i => i.userID).join(', ')
    fetchUsers({ userIds: uids })
  }
})

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

const add = async () => {
  await addTeachers({ group: props.group })
  emit('reload')
}

const opened = ref(false)
</script>

<template>
  <div class="button-wrapper">
    <button class="add-button" @click="opened = true">Добавить</button>
  </div>

  <section v-show="opened" class="add-modal">
    <div v-for="user in teachersList" :key="user.uid" class="teacher-wrapper">
      <group-user
        :avatar="user.avatar"
        :full-name="user.fullName"
      />
      <checkbox
        :state="user.selected"
        @toggle="user.selected = !user.selected"
      />
    </div>
    <div class="button-wrapper">
      <button class="cancel-button" @click="opened = false">Отмета</button>
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
