<script lang="ts" setup>
import {
  ref, inject, watch, onBeforeMount
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { UsersList } from '@/shared'
import { GroupNavItem } from '@/features/groups/types'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import StudentGroupNav from '../StudentGroupNav/StudentGroupNav.vue'
import JoinGroup from '../JoinGroup/JoinGroup.vue'

const key = inject<Key>('key')
const { state } = useStore(key)

const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()

const groupID = ref<number | null>(null) // todo type

const setGroupID = () => {
  if (state.userInfo) {
    if (state.userInfo.additionalData.inGroups.length)
      // eslint-disable-next-line
      groupID.value = state.userInfo.additionalData.inGroups[0]
    else groupID.value = 0
  }
}

onBeforeMount(setGroupID)
watch(() => state.userInfo, setGroupID)

watch(groupID, () => {
  if (typeof groupID.value === 'number')
    fetchGroupInfo({
      currentGroup: groupID.value
    })
})

const currentNav = ref<GroupNavItem>('Студенты')
</script>

<template>
  <div v-if="groupID === 0">
    <join-group />
  </div>
  <div v-else>
    <student-group-nav
      :group-nav-item="currentNav"
      :group-info="groupInfo"
      @toggle="navItem => currentNav = navItem"
    />

    <main class="student-group">
      <users-list
        v-show="groupInfo && currentNav === 'Студенты'"
        :users="groupInfo?.users.students"
      />
      <users-list
        v-show="groupInfo && currentNav === 'Преподаватели'"
        :users="groupInfo?.users.teachers"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.student-group {
  @include small-container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}
</style>
