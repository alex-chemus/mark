<script lang="ts" setup>
// eslint-disable-next-line
import { ref, computed } from 'vue'
import SearchGroups from '../SearchGroups/SearchGroups.vue'
import GroupControls from '../GroupControls/GroupControls.vue'
import GroupsList from '../GroupsList/GroupsList.vue'
import { IGroupButton } from '../types'

// fetch groups later
const groups = ref<IGroupButton[]>([
  { id: 1, name: 'группа 1' },
  { id: 2, name: 'группа 2' },
  { id: 3, name: 'группа 3' }
])

const searchedGroups = ref<number[] | null>(null)
const currentGroup = ref(2)

const getGroups = computed(() => {
  if (searchedGroups.value) {
    return groups.value.filter(group => {
      return searchedGroups.value?.includes(group.id)
    })
  } else {
    return groups.value
  }
})
</script>

<template>
  <aside class="groups-sidebar">
    <search-groups
      :groups="groups"
      @search="value => searchedGroups = value"
    />
    <div class="controls-wrapper">
      <group-controls />
    </div>
    <groups-list
      :groups="getGroups"
      :current-group="currentGroup"
      @switch="value => currentGroup = value"
    />
  </aside>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.groups-sidebar {
  //width: 256px;
}

.controls-wrapper {
  margin-top: var(--size-9);
  margin-bottom: var(--size-8);
}
</style>
