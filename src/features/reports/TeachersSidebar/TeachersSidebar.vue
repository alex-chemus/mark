<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed, inject, onMounted, watch
} from 'vue'
import { useFetch, IError, Checkbox } from '@/shared'
import { Key } from '@/store'
import { useStore } from 'vuex'
import SidebarSearch from '../SidebarSearch/SidebarSearch.vue'

const props = defineProps<{
  teacherIDs: number[],
  selectedIDs?: number[]
}>()

const emit = defineEmits<{
  (e: 'select', teacherID: number): void
}>()

const key = inject<Key>('key')
const { dispatch } = useStore(key)

interface ITeacher {
  id: number,
  fullName: string
}

const teachers = ref<ITeacher[] | null>(null)
const fetchTeachers = async () => {
  const { response, error } = await useFetch({
    path: 'methods/users.getInfo',
    data: {
      userIds: props.teacherIDs
    }
  })

  if (error) {
    console.log('error')
    dispatch('setError', error as IError)
  } else {
    teachers.value = response.map((t: any) => ({
      id: +t.id,
      fullName: `${t.lastName} ${t.firstName} ${t.patronymic}`
    } as ITeacher))
  }
}
onMounted(fetchTeachers)
watch(() => props.teacherIDs, fetchTeachers)

const searchedTeachers = ref<number[] | null>(null)
const getTeachers = computed(() => {
  function compare(a: ITeacher, b: ITeacher) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  }

  if (!teachers.value) return null

  if (searchedTeachers.value === null)
    return [...teachers.value].sort(compare)
  else if (teachers.value)
    return teachers.value
      .filter(t => searchedTeachers.value?.includes(t.id))
      .sort(compare)
  else return null
})
</script>

<template>
  <aside v-if="teachers">
    <sidebar-search
      :teachers="teachers"
      @input="result => searchedTeachers = result"
    />
    <div class="separator" />
    <h2 class="title">Преподаватели</h2>
    <button
      v-for="teacher in getTeachers" :key="teacher.id"
      class="checkbox"
      @click="emit('select', teacher.id)"
    >
      <checkbox
        :state="!!selectedIDs && selectedIDs.includes(teacher.id)"
      />
      <span>{{ teacher.fullName }}</span>
    </button>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.separator {
  width: 100%;
  height: 1px;
  background-color: var(--element-color);
  margin: var(--size-9) 0;
}

.title {
  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  font-weight: var(--fw-semibold);
  color: var(--text-color-1);
  margin-bottom: var(--size-8);

  /*@include md {
    font-size: var(--size-6);
  }*/
}

.checkbox {
  @include flex(flex-start, flex-start);
  margin-bottom: var(--size-6);
  @include button;

  & > * {
    margin-bottom: 0px;
  }

  span {
    margin-left: var(--size-1);
    word-break: normal;
    text-align: left;
  }
}
</style>
