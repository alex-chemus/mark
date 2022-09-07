<script lang="ts" setup>
import {
  ref, watch, inject, onMounted
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { UsersList } from '@/shared'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import { GroupsSidebar, GroupUsers } from '@/features/groups/common'
import { GroupNavItem } from '@/features/groups/types'
import AdminGroupNav from '../AdminGroupNav/AdminGroupNav.vue'
import AddTeacher from '../AddTeacher/AddTeacher.vue'

const key = inject<Key>('key')
const { state } = useStore(key)

const route = useRoute()
const router = useRouter()

const navItem = ref<GroupNavItem>('Студенты')

const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()

const currentGroup = ref<number | null>(null)
const setCurrentGroup = () => {
  if (route.path !== '/' && !route.path.startsWith('/groupID')) return
  if (state.institution?.groups) {
    const groupID = +(route.params.groupID as string)
    if (route.params.groupID && state.institution.groups.includes(groupID)) {
      currentGroup.value = groupID
    } else {
      console.log('push')
      router.push({ path: `/groupID/${state.institution.groups[0]}` })
    }
  }
}
onMounted(setCurrentGroup)
watch([
  () => state.institution?.groups,
  () => route.params.groupID
], setCurrentGroup)

const reload = async () => {
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
        :currentGroup="currentGroup"
        @change-group="value => router.push({ path: `/groupID/${value}` })"
      />
    </div>

    <section v-if="groupInfo" class="main">
      <admin-group-nav
        :group-info="groupInfo"
        :group-nav-item="navItem"
        :groups-list="state.institution?.groups"
        :current-group="currentGroup"
        @switch="value => navItem = value"
        @change-group="value => router.push({ path: `/groupID/${value}` })"
      />
      <group-users
        v-if="navItem === 'Студенты' && currentGroup"
        :users="groupInfo.users.students"
        :headStudentID="groupInfo.headStudentID"
        :deputyHeadStudentID="groupInfo.deputyHeadStudentID"
        :groupID="groupInfo.groupID"
        @update="reload"
      />
      <div v-else-if="navItem === 'Преподаватели' && currentGroup">
        <users-list :users="groupInfo.users.teachers" />
        <add-teacher
          :group="currentGroup"
          :group-info="groupInfo"
          @add="reload"
        />
      </div>
    </section>

    <!--<div v-else>something went wrong</div>-->
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
