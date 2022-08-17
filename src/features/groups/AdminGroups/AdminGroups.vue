<script lang="ts" setup>
import { ref } from 'vue'
import { IGroupUser, UsersList } from '@/shared'
import GroupsSidebar from '../GroupsSidebar/GroupsSidebar.vue'
import GroupPopup from '../GroupPopup/GroupPopup.vue'
import AdminGroupNav from '../AdminGroupNav/AdminGroupNav.vue'
import { GroupNavItem } from '../types'

const groupName = ref('Название группы')
const popupOpened = ref(false)
const sidebarOpened = ref(false)
const navItem = ref<GroupNavItem>('Студенты')

const students = ref<IGroupUser[]>([
  { fullName: 'Имя Фамилия', badgeText: 'Староста' },
  { fullName: 'Имя Фамилия', badgeText: 'Зам. старосты' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
])

const teachers = ref<IGroupUser[]>([
  { fullName: 'Сарычев Алексей Васильевич' },
  { fullName: 'Сарычев Алексей Васильевич' },
  { fullName: 'Сарычев Алексей Васильевич' },
  { fullName: 'Сарычев Алексей Васильевич' },
])
</script>

<template>
  <main class="admin-groups">
    <div class="desktop-sidebar">
      <groups-sidebar />
    </div>

    <section class="main">
      <admin-group-nav
        :group-name="groupName"
        :group-nav-item="navItem"
        @switch="value => navItem = value"
      />
      <users-list
        v-if="navItem === 'Студенты'"
        :users="students"
      />
      <users-list
        v-else-if="navItem === 'Преподаватели'"
        :users="teachers"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.admin-groups {
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-gap: var(--size-14);
  margin-bottom: var(--size-15);

  @include container;
  margin-top: var(--size-15);

  @include lg {
    grid-template-columns: 200px 1fr;
  }

  @include md {
    display: block;
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
}

.desktop-sidebar {
  @include md {
    display: none;
  }
}
</style>
