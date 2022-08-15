<script lang="ts" setup>
import { ref } from 'vue'
import { NavItem } from './types';
import InstitutionNav from './InstitutionNav/InstitutionNav.vue'

const currentNav = ref<NavItem>('Структура')
</script>

<template>
  <institution-nav
    :current-nav="currentNav"
    @swtich="value => currentNav = value"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.institution {
  @include container
}
</style>
