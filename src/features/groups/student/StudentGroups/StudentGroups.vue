<script lang="ts" setup>
import {
  ref, inject, watch, onBeforeMount, onMounted
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { UsersList } from '@/shared'
import { GroupNavItem } from '@/features/groups/types'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import { GroupUsers } from '@/features/groups/common'
import StudentGroupNav from '../StudentGroupNav/StudentGroupNav.vue'
import JoinGroup from '../JoinGroup/JoinGroup.vue'

const key = inject<Key>('key')
const { state } = useStore(key)

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  if (route.params.groupID)
    router.push({ path: '/' })
})

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

const reload = () => {
  if (typeof groupID.value === 'number' && groupID.value !== 0)
    fetchGroupInfo({
      currentGroup: groupID.value
    })
}

watch(groupID, reload)
onMounted(reload)

const currentNav = ref<GroupNavItem>('Студенты')
watch(currentNav, () => console.log(currentNav.value))

const checkStatus = (studentID: number) => {
  /* eslint-disable */
  if (!groupInfo.value) return
  else if (groupInfo.value.headStudentID === studentID) return 'Староста'
  else if (groupInfo.value.deputyHeadStudentID === studentID) return 'Зам. старосты'
  else return
  /* eslint-enable */
}
</script>

<template>
  <div v-if="groupID === 0" class="no-groups">
    Вы не состоите ни в одной группе
  </div>
  <div v-else>
    <student-group-nav
      :group-nav-item="currentNav"
      :group-info="groupInfo"
      @toggle="navItem => currentNav = navItem"
    />

    <main class="student-group">
      <template v-if="groupInfo && currentNav === 'Студенты'">
        <group-users
          v-if="groupInfo?.headStudentID === state.userInfo?.id"
          :users="groupInfo?.users.students"
          :headStudentID="groupInfo?.headStudentID"
          :deputyHeadStudentID="groupInfo?.deputyHeadStudentID"
          :groupID="groupInfo?.groupID"
          @update="reload"
        />
        <users-list
          v-else
          :users="groupInfo?.users.students"
          :check-status="checkStatus"
        />
      </template>
      <users-list
        v-else-if="groupInfo && currentNav === 'Преподаватели'"
        :users="groupInfo?.users.teachers"
      />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.no-groups {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  color: var(--text-color-1);
  text-align: center;

  @include md {
    font-size: var(--size-6);
  }
}

.student-group {
  @include small-container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}
</style>
