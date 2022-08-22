<script lang="ts" setup>
import {
  ref, defineEmits, defineProps, onMounted, computed, watch
} from 'vue'
import useFetchGroups from '@/features/groups/hooks/useFetchGroups'
import { IGroupButton } from '@/features/groups/types'
//import { useFetch } from '@/shared'
import SearchGroups from '../SearchGroups/SearchGroups.vue'
import GroupControls from '../GroupControls/GroupControls.vue'
import GroupsList from '../GroupsList/GroupsList.vue'
//import useFetchGroups from '../hooks/useFetchGroups'

const props = defineProps<{
  groupsIDs: number[], // groupsID[]
}>()

const emit = defineEmits<{
  (e: 'change-group', value: number): void
}>()

// fetch groups later
/*const groups = ref<IGroupButton[]>([
  { id: 1, name: 'группа 1' },
  { id: 2, name: 'группа 2' },
  { id: 3, name: 'группа 3' }
])*/

//const groups = ref<IGroupButton[]>([])

const { groups, fetchGroups } = useFetchGroups({
  groupsIDs: props.groupsIDs
})
const searchedGroups = ref<number[] | null>(null)
const currentGroup = ref(props.groupsIDs[0])

watch(currentGroup, () => emit('change-group', currentGroup.value))

//watch(groups, () => console.log(groups.value))

/*const fetchGroups = async () => {
  const { response } = await useFetch({
    path: 'markMethods/group.getInfo',
    data: {
      groupsIDs: props.groupsIDs.join(', ')
    }
  })
  groups.value = response.map((group: any) => ({
    groupName: group.groupName,
    groupID: group.groupID
  } as IGroupButton))
}*/
onMounted(fetchGroups)

const getGroups = computed(() => {
  if (searchedGroups.value) {
    return groups.value.filter(group => {
      return searchedGroups.value?.includes(group.groupID)
    })
  } else return groups.value
})

watch(
  () => getGroups.value,
  () => console.log(getGroups.value)
)

/*const getGroups = computed(() => {
  if (searchedGroups.value) {
    return groups.value.filter(group => {
      return searchedGroups.value?.includes(group.id)
    })
  } else {
    return groups.value
  }
})*/
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
