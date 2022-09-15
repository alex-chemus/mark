<script lang="ts" setup>
import {
  ref, inject, onMounted, watch, computed
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IReportInfo, useTime, PresenceUsers, AttendanceFilter
} from '@/features/reports'
import { Key } from '@/store'
import { useStore } from 'vuex'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import useReport from './hooks/useReport'

const route = useRoute()
const router = useRouter()

const key = inject<Key>('key')
const { getters, state } = useStore(key)

const { report, fetchReport } = useReport({ route })

const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()

onMounted(fetchReport)
watch(() => route.params.reportID, fetchReport)
watch(report, () => {
  if (report.value) {
    fetchGroupInfo({ currentGroup: report.value.groupID })
  }
})

type Filter = 'all' | 'absent' | 'present'
const filter = ref<Filter>('all')

const checkStatus = (userID: number) => {
  /* eslint-disable */
  if (!groupInfo.value) return
  if (groupInfo.value.headStudentID === userID) return 'Староста'
  if (groupInfo.value.deputyHeadStudentID === userID) return 'Зам. старосты'
  return
  /* eslint-enable */
}

const canEdit = computed(() => {
  if (!state.userInfo || !groupInfo.value) return false
  const isTeacher = getters.roles.includes('teacher')
  const isAdmin = getters.roles.includes('administrator_of_institution')
  //const isHeadStudent = state.userInfo.institutionData.groupStatus === 'head_student'
  //const isDeputyStudent = state.userInfo.institutionData.groupStatus === 'deputy_head_student'
  const isHeadStudent = state.userInfo.id === groupInfo.value.headStudentID
  const isDeputyStudent = state.userInfo.id === groupInfo.value.deputyHeadStudentID
  return isTeacher || isAdmin || isHeadStudent || isDeputyStudent
})
</script>

<template>
  <nav v-if="report" class="nav">
    <div class="title-group">
      <button v-if="router.options.history.state.back" class="back-button" @click="router.go(-1)">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-arrow-left" />
        </svg>
      </button>
      <h1 class="heading">
        <span>{{ report.date }}</span>
        <span>{{ report.groupName }}</span>
        <span>{{ report.institutionData.shortName }}</span>
      </h1>
    </div>

    <div class="desktop-filter">
      <button v-if="canEdit" class="edit-button" @click="router.push({ path: `/edit-report/${route.params.reportID}` })">
        <span>Редактировать</span>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-edit" />
        </svg>
      </button>
      <attendance-filter :filter="filter" @switch="value => filter = value" />
    </div>
  </nav>
  <main v-if="report" class="main">
    <div class="mobile-controls">
      <button class="edit-button" @click="router.push({ path: `/edit-report/${route.params.reportID}` })">
        <span>Редактировать</span>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-edit" />
        </svg>
      </button>
      <attendance-filter :filter="filter" @switch="value => filter = value" />
    </div>
    <presence-users
      :users-data="report.students"
      :filter="filter"
      :check-status="checkStatus"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.nav {
  @include container;
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  padding-bottom: var(--size-3);
  border-bottom: 1px solid var(--element-color);
  @include flex(space-between, flex-end);
  position: relative;

  @include md {
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
}

.title-group {
  @include flex;
}

.back-button {
  @include button;
  margin-right: var(--size-3);

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.heading {
  margin: 0;
  font-size: var(--size-9);
  font-family: var(--ff-montserrat);
  font-weight: var(--fw-semibold);
  color: var(--text-color-1);

  span:not(:last-child) {
    margin-right: var(--size-2);
  }

  @include lg {
    font-size: var(--size-8);
  }

  @include md {
    font-size: var(--size-6);
  }

  @include flex;
  flex-wrap: wrap;

  span {
    white-space: nowrap;
  }
}

.desktop-filter {
  @include flex(flex-start, flex-end);
  //@include gap(var(--size-9));

  & > *:not(:last-child) {
    margin-right: var(--size-9);
    //color: red;
    //background-color: yellow;
  }

  @include md {
    display: none;
  }
}

.edit-button {
  @include button;
  //align-items: flex-end;
  @include gap(var(--size-1));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.main {
  @include small-container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}

.mobile-controls {
  @include flex(space-between, center);
  position: relative;
  margin-bottom: var(--size-9);

  @media (min-width: $md) {
    display: none;
  }
}
</style>
