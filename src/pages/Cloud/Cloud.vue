<script lang="ts" setup>
import {
  ref, provide, computed, inject
} from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import { MyCloud, OurCloud } from '@/features/cloud'
import { NavItem, IGroupName } from './types'
import {
  currentNavKey, groupKey, groupsListKey, currentGroupKey, setCurrentGroupKey
} from './keys'
import CloudNav from './CoudNav/CloudNav.vue'

const key = inject<Key>('key')
const { getters } = useStore(key)

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
  console.log(currentGroup.value)
}

provide(currentNavKey, currentNav)
provide(groupKey, group)
provide(groupsListKey, groupsList)
provide(currentGroupKey, currentGroup)
provide(setCurrentGroupKey, setCurrentGroup)

const getGroup = computed(() => {
  //if (currentNav.value === 'Мое облако') return group.value
  //else return groupsList.value[currentGroup.value].name
  if (getters.roles.includes('teacher'))
    return groupsList.value[currentGroup.value - 1].name
  else
    return group.value // fetch later
})
</script>

<template>
  <main class="cloud-page">
    <cloud-nav
      :current-nav="currentNav"
      @switch="value => currentNav = value"
    />
    <my-cloud v-if="currentNav === 'Мое облако'" />
    <our-cloud v-else :group="getGroup" />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-page {
  @include container;
}
</style>
