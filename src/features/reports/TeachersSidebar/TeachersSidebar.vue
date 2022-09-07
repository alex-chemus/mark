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
  if (searchedTeachers.value === null)
    return teachers.value
  else if (teachers.value)
    return teachers.value.filter(t => searchedTeachers.value?.includes(t.id))
  else return null
})
</script>

<template>
  <aside v-if="teachers">
    <sidebar-search
      :teachers="teachers"
      @input="result => searchedTeachers = result"
    />
    <div v-for="teacher in getTeachers" :key="teacher.id">
      <checkbox
        :state="!!selectedIDs && selectedIDs.includes(teacher.id)"
        @toggle="emit('select', teacher.id)"
      />
      <span>{{ teacher.fullName }}</span>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';
</style>
