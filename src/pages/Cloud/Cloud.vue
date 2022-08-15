<script lang="ts" setup>
import { ref, provide } from 'vue'
import { NavItem, IGroupName } from './types'
import {
  currentNavKey, groupKey, groupsListKey, currentGroupKey, setCurrentGroupKey
} from './keys'
import CloudNav from './CoudNav/CloudNav.vue'

const currentNav = ref<NavItem>('Мое облако')

// fetch data later
const group = ref('*название группы*')

const groupsList = ref<IGroupName[]>([
  { id: 1, name: 'ИСП-3,4-2020 БО' },
  { id: 2, name: 'ИСП-1,2-2020 БО' },
  { id: 3, name: 'ИСП-1,2-2021 БС' }
])

const currentGroup = ref(1)
const setCurrentGroup = (value: number) => {
  currentGroup.value = value
}

provide(currentNavKey, currentNav)
provide(groupKey, group)
provide(groupsListKey, groupsList)
provide(currentGroupKey, currentGroup)
provide(setCurrentGroupKey, setCurrentGroup)
</script>

<template>
  <main class="cloud-page">
    <cloud-nav
      :current-nav="currentNav"
      @switch="value => currentNav = value"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-page {
  @include container;
}
</style>
