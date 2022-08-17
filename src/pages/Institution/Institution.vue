<script lang="ts" setup>
import { ref } from 'vue'
import { NavItem } from './types';
import InstitutionNav from './InstitutionNav/InstitutionNav.vue'
import Teachers from './Teachers/Teachers.vue'
import Faculties from './Faculties/Faculties.vue'

const currentNav = ref<NavItem>('Структура')
</script>

<template>
  <institution-nav
    :current-nav="currentNav"
    @swtich="value => currentNav = value"
  />
  <teachers v-if="currentNav == 'Преподаватели'" />
  <faculties v-else />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.institution {
  @include container;
}
</style>
