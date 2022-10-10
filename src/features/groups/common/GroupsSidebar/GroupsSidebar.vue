<script lang="ts" setup>
import {
  ref, defineEmits, defineProps, computed, watch, inject, onMounted
} from 'vue'
import { Key, IGroupInfo } from '@/store'
import { useStore } from 'vuex'
import SearchGroups from '../SearchGroups/SearchGroups.vue'
import GroupControls from '../GroupControls/GroupControls.vue'
import GroupsList from '../GroupsList/GroupsList.vue'

const props = defineProps<{
  groupsIDs: number[], // groupsID[]
  currentGroup: number | null
}>()

const emit = defineEmits<{
  (e: 'change-group', value: number): void
}>()

const key = inject<Key>('key')
const { state, getters } = useStore(key)

const groups = ref<null | IGroupInfo[]>(null)

const setGroups = () => {
  if (!state.groups || !props.groupsIDs) return
  groups.value = getters.getGroups(props.groupsIDs)
}
watch([
  () => state.groups,
  () => props.groupsIDs
], setGroups)
onMounted(setGroups)

const searchedGroups = ref<number[] | null>(null)
const getGroups = computed(() => {
  if (!groups.value) return []

  if (searchedGroups.value) {
    return groups.value.filter(group => {
      return searchedGroups.value?.includes(group.groupID)
    })
  } else return groups.value
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
      @switch="value => emit('change-group', value)"
    />
  </aside>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.controls-wrapper {
  margin-top: var(--size-9);
  margin-bottom: var(--size-8);
}
</style>
