<script lang="ts" setup>
import {
  ref, watch, inject, onMounted
} from 'vue'
import { Key, IGroupInfo } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { UsersList } from '@/shared'
import { GroupsSidebar, GroupUsers } from '@/features/groups/common'
import { GroupNavItem } from '@/features/groups/types'
import AdminGroupNav from '../AdminGroupNav/AdminGroupNav.vue'
import AddTeacher from '../AddTeacher/AddTeacher.vue'

const key = inject<Key>('key')
const { state, getters } = useStore(key)

const route = useRoute()
const router = useRouter()

const navItem = ref<GroupNavItem>('Студенты')

const currentGroup = ref<number | null>(null)
const setCurrentGroup = () => {
  if (route.path !== '/' && !route.path.startsWith('/groupID')) return
  if (state.institution?.groups) {
    const groupID = +(route.params.groupID as string)
    if (route.params.groupID && state.institution.groups.includes(groupID)) {
      currentGroup.value = groupID
    } else {
      router.push({ path: `/groupID/${state.institution.groups[0]}` })
    }
  }
}
onMounted(setCurrentGroup)
watch([
  () => state.institution,
  () => route.params.groupID
], setCurrentGroup)

const groupInfo = ref<IGroupInfo | null>(null)
watch([
  () => state.groups, currentGroup
], () => groupInfo.value = getters.getGroups(currentGroup.value))
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
      <section v-if="navItem === 'Студенты'" class="attendance">
        <button @click="router.push({ path: `/attendance/group/${groupInfo!.groupID}` })">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-list-check" />
          </svg>
          <span>Посещаемость</span>
        </button>
      </section>
      <group-users
        v-if="navItem === 'Студенты' && currentGroup"
        :users="groupInfo.users.students"
        :headStudentID="groupInfo.headStudentID"
        :deputyHeadStudentID="groupInfo.deputyHeadStudentID"
        :groupID="groupInfo.groupID"
      />
      <div v-else-if="navItem === 'Преподаватели' && currentGroup">
        <users-list :users="groupInfo.users.teachers" />
        <add-teacher
          :group="currentGroup"
          :group-info="groupInfo"
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
  z-index: 1;
  @include scrollbar;
  align-self: start;
  @include md {
    display: none;
  }
}

.attendance {
  width: fit-content;
  padding-bottom: var(--size-3);
  border-bottom: 1px solid var(--element-color);
  margin-bottom: var(--size-9);

  button {
    @include button;
    align-items: center;
    @include gap(var(--size-1));

    &:hover,
    &:focus {
      color: var(--color-accent);
    }
  }
}
</style>
