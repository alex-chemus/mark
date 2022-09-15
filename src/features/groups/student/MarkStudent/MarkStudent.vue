<script lang="ts" setup>
import {
  defineProps, defineEmits, inject, onMounted, ref, computed
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFetch, IError } from '@/shared'
import { IResponseAttendance } from '@/features/reports'

const props = defineProps<{
  groupID: number,
  studentID: number,
  canMakeReports: boolean
}>()

const emit = defineEmits<{
  (e: 'mark', message: string): void,
}>()

const router = useRouter()

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const isMarked = ref(false)
const getMark = async () => {
  const { error, response } = await useFetch({
    path: 'markMethods/attendance.getAttendanceListInfo',
    data: {
      groupID: props.groupID
    }
  })

  if (error) {
    dispatch('setError', error as IError)
    console.log(error)
  } else {
    isMarked.value = response.students
      .find((s: IResponseAttendance) => s.userID === props.studentID)
      .isPresent
  }
}
onMounted(getMark)

const markStudent = async () => {
  const { error } = await useFetch({
    path: 'markMethods/attendance.markUserAttendance',
    data: {
      groupID: props.groupID,
      usersIDs: props.studentID
    }
  })

  if (error) {
    console.log(error)
    dispatch('setError', error as IError)
  } else {
    emit('mark', 'Вы отмечены!')
    getMark()
  }
}

const removeStudent = async () => {
  const { error } = await useFetch({
    path: 'markMethods/attendance.removeUserAttendance',
    data: {
      groupID: props.groupID,
      usersIDs: props.studentID
    }
  })

  if (error) {
    console.log(error)
    dispatch('setError', error as IError)
  } else {
    emit('mark', 'Отметка снята!')
    getMark()
  }
}

const newReport = () => {
  router.push({ path: `/new-report/${props.groupID}` })
}

const getMarkMethod = computed(() => {
  return isMarked.value ? removeStudent : markStudent
})

const history = () => {
  router.push({ path: `/attendance/group/${props.groupID}` })
}
</script>

<template>
  <section class="mark-section">
    <button v-if="canMakeReports" @click="newReport">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-file-description" />
      </svg>
      <span>Составить отчет</span>
    </button>
    <button v-else @click="getMarkMethod">
      <svg v-if="isMarked" width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-hand-stop" />
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-hand-off" />
      </svg>
      <span>Отметиться</span>
    </button>

    <button @click="history" class="mobile-reverse">
      <span>История отчетов</span>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-history" />
      </svg>
    </button>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.mark-section {
  @include flex(space-between, center);
  padding-bottom: var(--size-3);
  border-bottom: 1px solid var(--element-color);
  margin-bottom: var(--size-9);

  @include sm {
    display: block;
    @include gap(0);
    @include gap(var(--size-6), 'column');
    border-bottom: none;
    padding-bottom: 0;
  }
}

button {
  @include button;
  @include gap(var(--size-1));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  &.mobile-reverse {
    @include sm {
      flex-direction: row-reverse;
      @include gap(0);

      & > *:last-child {
        margin-right: var(--size-1);
      }
    }
  }
}
</style>
