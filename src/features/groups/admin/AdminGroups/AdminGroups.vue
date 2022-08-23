<script lang="ts" setup>
import { ref, watch, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { UsersList } from '@/shared'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import { GroupsSidebar } from '@/features/groups/common'
import { GroupNavItem } from '@/features/groups/types'
import AdminGroupNav from '../AdminGroupNav/AdminGroupNav.vue'
import AddTeacher from '../AddTeacher/AddTeacher.vue'

const key = inject<Key>('key')
const { state } = useStore(key)

const navItem = ref<GroupNavItem>('Студенты')

watch(
  () => state.institution?.groups,
  () => {
    // eslint-disable-next-line
    if (state.institution?.groups) currentGroup.value = state.institution.groups[0]
  }
)

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
</script>

<template>
  <main class="admin-groups">
    <div class="desktop-sidebar">
      <groups-sidebar
        v-if="state.institution?.groups"
        :groupsIDs="state.institution.groups"
        @change-group="value => currentGroup = value"
      />
    </div>

    <section class="main" v-if="groupInfo">
      <admin-group-nav
        :group-info="groupInfo"
        :group-nav-item="navItem"
        :groups-list="state.institution?.groups"
        @switch="value => navItem = value"
        @change-group="value => currentGroup = value"
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

  @include container;
  margin-top: var(--size-15);
  margin-bottom: var(--size-15);

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
  @include sticky;
  @include scrollbar;
  align-self: start;
  @include md {
    display: none;
  }
}
</style>
