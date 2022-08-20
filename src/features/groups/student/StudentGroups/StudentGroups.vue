<script lang="ts" setup>
import { ref } from 'vue'
import { IGroupUser, UsersList } from '@/shared'
import { GroupNavItem } from '@/features/groups/types'
import StudentGroupNav from '../StudentGroupNav/StudentGroupNav.vue'

const currentNav = ref<GroupNavItem>('Студенты')

const students = ref<IGroupUser[]>([
  { fullName: 'Имя Фамилия', badgeText: 'Староста' },
  { fullName: 'Имя Фамилия', badgeText: 'Зам. старосты' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
])
</script>

<template>
  <student-group-nav
    :group-nav-item="currentNav"
    group-name="*название группы*"
    @toggle="navItem => currentNav = navItem"
  />

  <main class="student-group">
    <users-list
      :users="students"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.student-group {
  @include small-container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}
</style>
