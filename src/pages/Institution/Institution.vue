<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Key } from '@/store'
import { NavItem } from './types'
import InstitutionNav from './InstitutionNav/InstitutionNav.vue'
import Teachers from './Teachers/Teachers.vue'
import Faculties from './Faculties/Faculties.vue'

const key = inject<Key>('key')
const { getters, state } = useStore(key)

const router = useRouter()

if (!getters.roles?.includes('administrator_of_institution')) {
  router.push({ path: '/notfound' })
}

const currentNav = ref<NavItem>('Структура')

const showTeachers = computed(() => {
  return currentNav.value === 'Преподаватели' && state.institution
})

const showFaculties = computed(() => {
  return currentNav.value === 'Структура' && state.institution
})
</script>

<template>
  <institution-nav
    :current-nav="currentNav"
    @swtich="value => currentNav = value"
  />
  <teachers
    v-show="showTeachers"
    :teachers="state.institution?.additionalData.staff.teachers"
  />
  <faculties
    v-show="showFaculties"
    :faculties="state.institution?.additionalData.faculties"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.institution {
  @include container;
}
</style>
