<script lang="ts" setup>
import {
  ref, inject, onMounted, computed, provide, watch
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Key } from '@/store'
import { useFetchInstitution } from '@/shared'
import { NavItem } from './types'
import { reloadKey } from './keys'
import InstitutionNav from './InstitutionNav/InstitutionNav.vue'
import Teachers from './Teachers/Teachers.vue'
import Faculties from './Faculties/Faculties.vue'

const key = inject<Key>('key')
const { getters } = useStore(key)

const router = useRouter()

if (!getters.roles?.includes('administrator_of_institution')) {
  router.push({ path: '/notfound' })
}

/*const institutionInfo = ref<IInstitution | null>(null)

const loadData = async () => {
  if (!state.userInfo) return
  const institutionID = getters.IID
  const info = await useFetch({ path: 'markMethods/institution.getInfo', data: { institutionID } })
  institutionInfo.value = info.response
  console.log(institutionInfo.value)
}*/

const { institutionInfo, fetchInfo } = useFetchInstitution()
watch(institutionInfo, () => console.log(institutionInfo.value))

onMounted(fetchInfo)
provide(reloadKey, fetchInfo)

const currentNav = ref<NavItem>('Структура')

const showTeachers = computed(() => {
  return currentNav.value === 'Преподаватели' && institutionInfo.value
})

const showFaculties = computed(() => {
  return currentNav.value === 'Структура' && institutionInfo.value
})
</script>

<template>
  <institution-nav
    :current-nav="currentNav"
    @swtich="value => currentNav = value"
  />
  <teachers
    v-show="showTeachers"
    :teachers="institutionInfo?.additionalData.staff.teachers"
  />
  <faculties
    v-show="showFaculties"
    :faculties="institutionInfo?.additionalData.faculties"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.institution {
  @include container;
}
</style>
