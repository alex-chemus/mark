<script lang="ts" setup>
import {
  onBeforeMount, watch, onMounted, ref, inject
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { ReportUsers, TeachersSidebar } from '@/features/reports'
import useValidation from './hooks/useValidation'
import useAttendance from './hooks/useAttendance'
import useTeachers from './hooks/useTeachers'
import useSaveReport from './hooks/useSaveReport'
import useCreateReport from './hooks/useCreateReport'

const router = useRouter()
const route = useRoute()

const key = inject<Key>('key')
const { getters } = useStore(key)

const { validate, validationDeps, isValid } = useValidation({ route, router })
onBeforeMount(validate)
watch(validationDeps, validate)

const { attendance, fetchAttendance, updateAttendance } = useAttendance({ route })
onMounted(() => fetchAttendance(isValid))
watch(isValid, () => fetchAttendance(isValid))

const { teacherIDs, fetchTeachers } = useTeachers()
/*onMounted(() => fetchTeachers({
  groupID: +(route.params.groupID as string), isValid
}))
watch(isValid, () => fetchTeachers({
  groupID: +(route.params.groupID as string), isValid
}))*/
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

const { saveReport } = useSaveReport()
const save = () => {
  if (isValid && attendance.value) {
    saveReport({
      attendance: attendance.value,
      groupID: +(route.params.groupID as string)
    })
  }
}

const { createAndSendReport } = useCreateReport()
const sendReport = () => {
  if (isValid) {
    if (!getters.roles.includes('teacher')) {
      createAndSendReport({
        groupID: +(route.params.groupID as string),
        usersIDs: selectedIDs.value
      })
    } else {
      createAndSendReport({
        groupID: +(route.params.groupID as string)
      })
    }
  }
}
//const sendReport = () => {}
</script>

<template>
  <main v-if="attendance">
    <teachers-sidebar
      v-if="teacherIDs"
      :teacherIDs="teacherIDs"
      :selectedIDs="selectedIDs"
      @select="onTeacherSelect"
    />
    <report-users
      :users-data="attendance"
      @edit="updateAttendance"
    />
    <button @click="save">Сохранить отчет</button>
    <button @click="sendReport">Отправить отчет</button>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
