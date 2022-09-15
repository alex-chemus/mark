<script lang="ts" setup>
import {
  onMounted, watch, ref, inject
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useFetch, IError, Alert } from '@/shared'
import { ReportUsers, IResponseAttendance } from '@/features/reports'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import useReport from './hooks/useReport'

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const route = useRoute()
const router = useRouter()

const { report, fetchReport } = useReport({ route })
const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()

onMounted(fetchReport)
watch(() => route.params.reportID, fetchReport)

const attendance = ref<IResponseAttendance[] | null>(null)

watch(report, () => {
  if (report.value) {
    attendance.value = report.value.students.map(s => ({
      userID: s.userID,
      firstName: s.firstName,
      lastName: s.lastName,
      patronymic: s.patronymic,
      isPresent: s.isPresent,
      status: s.status
    } as IResponseAttendance))
    fetchGroupInfo({ currentGroup: report.value.groupID })
  }
})

const updateAttendance = (userID: number | string) => {
  if (!attendance.value) return
  attendance.value = attendance.value.map(user => {
    if (user.userID === userID)
      return { ...user, isPresent: !user.isPresent }
    else
      return user
  })
}

const checkStatus = (userID: number | string) => {
  /* eslint-disable */
  if (!groupInfo.value) return
  if (typeof userID === 'string') return
  if (groupInfo.value.headStudentID === userID) return 'Староста'
  if (groupInfo.value.deputyHeadStudentID === userID) return 'Зам. старосты'
  return
  /* eslint-enable */
}

const message = ref('')
const messageCount = ref(0)

const editReport = async () => {
  if (!attendance.value) return

  const presentStudents = attendance.value
    .filter(s => s.isPresent).map(s => s.userID)
  const missingStudents = attendance.value
    .filter(s => !s.isPresent).map(s => s.userID)

  const { error } = await useFetch({
    path: 'markMethods/attendance.editAttendanceReport',
    data: {
      reportID: route.params.reportID,
      presentStudents,
      missingStudents
    }
  })

  if (error) {
    console.log(error)
    dispatch('setError', error as IError)
  } else {
    message.value = 'Отчет изменен!'
    messageCount.value += 1
  }
}
</script>

<template>
  <alert :text="message" :observer="messageCount" />
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

    <button class="save-button --desktop" @click="editReport">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-device-floppy" />
      </svg>
      <span>Сохранить</span>
    </button>
  </nav>

  <main v-if="attendance" class="main">
    <div class="mobile-controls">
      <button class="save-button" @click="editReport">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="@/assets/tabler-sprite.svg#tabler-device-floppy" />
        </svg>
        <span>Сохранить</span>
      </button>
    </div>
    <report-users
      :users-data="attendance"
      :check-status="checkStatus"
      @edit="updateAttendance"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.back-button {
  @include button;
  margin-right: var(--size-3);

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

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

.save-button {
  @include button;
  align-items: flex-end;
  @include gap(var(--size-1));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  &.--desktop {
    @include md {
      display: none;
    }
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
  position: relative;
  margin-bottom: var(--size-9);

  @media (min-width: $md) {
    display: none;
  }
}
</style>
