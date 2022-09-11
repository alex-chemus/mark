<script lang="ts" setup>
import {
  onBeforeMount, watch, onMounted, ref, inject
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { Alert } from '@/shared'
import { ReportUsers, TeachersSidebar } from '@/features/reports'
import {
  useValidation, useAttendance, useTeachers, useSaveReport, useCreateReport, useGroupInfo
} from './hooks'

const router = useRouter()
const route = useRoute()

const key = inject<Key>('key')
const { getters } = useStore(key)

const { validate, validationDeps, isValid } = useValidation({ route, router })
onBeforeMount(validate)
watch(validationDeps, validate)

const { attendance, fetchAttendance, updateAttendance } = useAttendance({ route })
onMounted(() => fetchAttendance(isValid))
watch([
  isValid,
  () => route.params.groupID
], () => fetchAttendance(isValid))

const { teacherIDs, fetchTeachers } = useTeachers()
const getTeachers = () => {
  if (!getters.roles.includes('teacher')) {
    fetchTeachers({
      groupID: +(route.params.groupID as string), isValid
    })
  }
}
onMounted(getTeachers)
watch(isValid, getTeachers)

const selectedIDs = ref<number[]>([])
const onTeacherSelect = (teacherID: number) => {
  if (selectedIDs.value.includes(teacherID)) {
    selectedIDs.value = selectedIDs.value.filter(id => id !== teacherID)
  } else {
    selectedIDs.value.push(teacherID)
  }
}

const { saveReport, saveCount } = useSaveReport()
const save = () => {
  if (isValid && attendance.value) {
    saveReport({
      attendance: attendance.value,
      groupID: +(route.params.groupID as string)
    })
  }
}

const { createAndSendReport, createAndSaveCount, notSelectedCounter } = useCreateReport()
const sendReport = () => {
  if (isValid && attendance.value) {
    if (!getters.roles.includes('teacher')) {
      console.log('create report')
      createAndSendReport({
        groupID: +(route.params.groupID as string),
        usersIDs: selectedIDs.value,
        attendance: attendance.value
      })
    } else {
      createAndSendReport({
        groupID: +(route.params.groupID as string),
        attendance: attendance.value
      })
    }
  }
}

const {
  groupName, fetchGroupInfo, headStudentID, deputyStudentID
} = useGroupInfo()
const getGroupName = () => {
  if (!isValid.value) return
  fetchGroupInfo({ groupID: +(route.params.groupID as string) })
}
onMounted(getGroupName)
watch([
  isValid,
  () => route.params.groupID
], getGroupName)

const opened = ref(false)

const checkStatus = (userID: number) => {
  if (userID === headStudentID.value) return 'Староста'
  if (userID === deputyStudentID.value) return 'Зам. старосты'
  return undefined
}
</script>

<template>
  <alert text="Учителя не выбраны!" :observer="notSelectedCounter" />
  <alert text="Отчет сохранен и отправлен!" :observer="createAndSaveCount" />
  <alert text="Посещаемость сохранена!" :observer="saveCount" />
  <div v-if="attendance && !attendance.length" class="no-students">
    В этой группе нет студентов
  </div>
  <main v-else-if="attendance && teacherIDs" class="main --sidebar">
    <section class="sidebar --desktop">
      <teachers-sidebar
        :teacherIDs="teacherIDs"
        :selectedIDs="selectedIDs"
        @select="onTeacherSelect"
      />
      <div class="separator" />
      <button @click="save" class="button">Отметить</button>
      <button @click="sendReport" class="button">Отправить отчет</button>
    </section>
    <section>
      <div v-if="groupName" class="group-title">
        <h3>{{ groupName }}</h3>
        <button class="mobile-sidebar-button" @click="opened = !opened">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-layout-sidebar-right" />
          </svg>
        </button>
        <section v-if="opened" class="popup">
          <teachers-sidebar
            :teacherIDs="teacherIDs"
            :selectedIDs="selectedIDs"
            @select="onTeacherSelect"
          />
          <div class="separator" />
          <button @click="save" class="button">Отметить</button>
          <button @click="sendReport" class="button">Отправить отчет</button>
        </section>
        <!-- eslint-disable-next-line -->
        <div v-if="opened" class="backdrop" @click="opened = !opened" />
      </div>
      <report-users
        :users-data="attendance"
        @edit="updateAttendance"
        :check-status="checkStatus"
      />
    </section>
  </main>

  <template v-else-if="attendance">
    <nav v-if="groupName" class="nav">
      <h1>{{ groupName }}</h1>
    </nav>
    <main class="main-single">
      <report-users
        :users-data="attendance"
        @edit="updateAttendance"
        :check-status="checkStatus"
      />
      <button @click="save" class="button --mt">Отметить</button>
      <button @click="sendReport" class="button">Отправить отчет</button>
    </main>
  </template>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.no-students {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  color: var(--text-color-1);
  text-align: center;

  @include md {
    font-size: var(--size-6);
  }
}

.main {
  @include container;
  margin-top: var(--size-15);
  margin-bottom: var(--size-15);
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-gap: var(--size-14);

  @include lg {
    grid-template-columns: 200px 1fr;
  }

  @include md {
    display: block;
    margin-top: var(--size-11);
    margin-bottom: var(--size-11);
  }
}

.sidebar.--desktop {
  @include md {
    display: none;
  }
}

.separator {
  width: 100%;
  height: 1px;
  background-color: var(--element-color);
  margin: var(--size-9) 0;
}

.button {
  margin-top: var(--size-7);
  @include button-hollow;

  &.--mt {
    margin-top: var(--size-11);
  }
}

.group-title {
  padding-bottom: var(--size-3);
  border-bottom: 1px solid var(--element-color);
  margin-bottom: var(--size-11);
  @include flex(space-between, flex-end);

  h3 {
    font-size: var(--size-9);
    font-weight: var(--fw-semibold);
    font-family: var(--ff-montserrat);
    color: var(--text-color-1);

    @include md {
      font-size: var(--size-6);
    }
  }
}

.mobile-sidebar-button {
  display: none;

  @include md {
    @include button;
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.popup {
  @include popup('right');
  padding: var(--size-10);
}

.backdrop {
  @include backdrop;
}

.nav {
  @include small-container;
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  padding-bottom: var(--size-3);
  border-bottom: 1px solid var(--element-color);

  @include md {
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }

  h1 {
    margin: 0;
    padding: 0;
    font-family: var(--ff-montserrat);
    font-size: var(--size-9);
    font-weight: var(--fw-semibold);
    color: var(--text-color-1);

    @include md {
      font-size: var(--size-6);
    }
  }
}

.main-single {
  @include small-container;
}
</style>
