<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { UsersList } from '@/shared'
import useFetchGroupsList from '@/features/groups/hooks/useFetchGroupsList'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import { GroupsSidebar } from '@/features/groups/common'
import { GroupNavItem } from '@/features/groups/types'
import AdminGroupNav from '../AdminGroupNav/AdminGroupNav.vue'
import AddTeacher from '../AddTeacher/AddTeacher.vue'

//const groupName = ref('Название группы')
const popupOpened = ref(false)
const sidebarOpened = ref(false)
const navItem = ref<GroupNavItem>('Студенты')

const { groupsList, fetchGroupsList } = useFetchGroupsList()
watch(groupsList, () => {
  // eslint-disable-next-line
  if (groupsList.value) currentGroup.value = groupsList.value[0]
})

const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()
const currentGroup = ref<number | null>(null)

const reload = () => {
  if (currentGroup.value) {
    fetchGroupInfo({
      currentGroup: currentGroup.value
    })
  }
}
watch(currentGroup, reload)

watch(groupInfo, () => console.log(groupInfo.value))

onMounted(fetchGroupsList)
</script>

<template>
  <main class="admin-groups">
    <div class="desktop-sidebar">
      <groups-sidebar
        v-if="groupsList"
        :groupsIDs="groupsList"
        @change-group="value => currentGroup = value"
      />
    </div>

    <section class="main" v-if="groupInfo">
      <admin-group-nav
        :group-info="groupInfo"
        :group-nav-item="navItem"
        :groups-list="groupsList"
        @switch="value => navItem = value"
      />
      <users-list
        v-if="navItem === 'Студенты' && currentGroup"
        :users="groupInfo.users.students"
      />
      <div v-else-if="navItem === 'Преподаватели' && currentGroup">
        <users-list :users="groupInfo.users.teachers" />
        <add-teacher
          :group="currentGroup"
          :group-info="groupInfo"
        />
      </div>
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
