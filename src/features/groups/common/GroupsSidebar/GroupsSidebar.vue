<script lang="ts" setup>
import {
  ref, defineEmits, defineProps, onMounted, computed, watch
} from 'vue'
import useFetchGroups from '@/features/groups/hooks/useFetchGroups'
import SearchGroups from '../SearchGroups/SearchGroups.vue'
import GroupControls from '../GroupControls/GroupControls.vue'
import GroupsList from '../GroupsList/GroupsList.vue'

const props = defineProps<{
  groupsIDs: number[], // groupsID[]
}>()

const emit = defineEmits<{
  (e: 'change-group', value: number): void
}>()

const { groups, fetchGroups } = useFetchGroups()

const searchedGroups = ref<number[] | null>(null)
const currentGroup = ref(props.groupsIDs[0])

watch(currentGroup, () => emit('change-group', currentGroup.value))

onMounted(() => fetchGroups({
  groupsIDs: props.groupsIDs
}))
watch(
  () => props.groupsIDs,
  () => fetchGroups({
    groupsIDs: props.groupsIDs
  })
)

const getGroups = computed(() => {
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
      @switch="value => currentGroup = value"
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
