<script lang="ts" setup>
import {
  ref, inject, watch, onBeforeMount, onMounted, computed
} from 'vue'
import { Key, IGroupInfo } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { UsersList, Alert, Robot } from '@/shared'
import { GroupNavItem } from '@/features/groups/types'
import useRobots from '@/features/groups/hooks/useRobots'
import { GroupUsers } from '@/features/groups/common'
import StudentGroupNav from '../StudentGroupNav/StudentGroupNav.vue'
import MarkStudent from '../MarkStudent/MarkStudent.vue'
import AddRobot from '../AddRobot/AddRobot.vue'

const key = inject<Key>('key')
const { state, dispatch, getters } = useStore(key)

const route = useRoute()
const router = useRouter()

onBeforeMount(() => {
  if (route.params.groupID)
    router.push({ path: '/' })
})

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

const groupInfo = ref<IGroupInfo | null>(null)
const setGroupInfo = () => {
  groupInfo.value = getters.getGroups(groupID.value)
}
onMounted(setGroupInfo)
watch(() => state.groups, setGroupInfo)

const { sortedRobots, deleteRobot } = useRobots({ groupID })

const currentNav = ref<GroupNavItem>('Студенты')

const checkStatus = (studentID: number) => {
  /* eslint-disable */
  if (!groupInfo.value) return
  else if (groupInfo.value.headStudentID === studentID) return 'Староста'
  else if (groupInfo.value.deputyHeadStudentID === studentID) return 'Зам. старосты'
  else return
  /* eslint-enable */
}

const message = ref('')
const messageCount = ref(0)

const mark = (m: string) => {
  message.value = m
  messageCount.value += 1
}

const isHeadOrDeputy = computed(() => {
  if (!groupInfo.value || !state.userInfo) return false
  return groupInfo.value.headStudentID === state.userInfo.id
    || groupInfo.value.deputyHeadStudentID === state.userInfo.id
})
</script>

<template>
  <alert :text="message" :observer="messageCount" />
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
      <template v-if="groupInfo && state.userInfo && currentNav === 'Студенты'">
        <mark-student
          :groupID="groupInfo.groupID"
          :studentID="state.userInfo?.id"
          :can-make-reports="isHeadOrDeputy"
          @mark="mark"
        />
        <group-users
          v-if="groupInfo.headStudentID === state.userInfo.id"
          :users="groupInfo?.users.students"
          :headStudentID="groupInfo?.headStudentID"
          :deputyHeadStudentID="groupInfo?.deputyHeadStudentID"
          :groupID="groupInfo?.groupID"
        />
        <users-list
          v-else
          :users="groupInfo?.users.students"
          :check-status="checkStatus"
        />
        <section v-if="isHeadOrDeputy && sortedRobots" class="robots-section">
          <h3 class="robots-heading">Роботы</h3>
          <div v-for="robot in sortedRobots" :key="robot.robotID" class="robot">
            <robot
              :full-name="`${robot.lastName} ${robot.firstName} ${robot.patronymic}`"
              :robotID="robot.robotID"
              :with-options="true"
              @delete="groupID => deleteRobot(groupID, () => dispatch('useGroups'))"
            />
          </div>
          <add-robot
            :group-info="groupInfo"
            @added="dispatch('useGroups')"
          />
        </section>
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

.robot {
  &:not(:last-child) {
    margin-bottom: var(--size-8);
  }
}

.robots-section {
  margin-top: var(--size-11);
}

.robots-heading {
  font-family: var(--ff-montserrat);
  font-size: var(--size-7);
  color: var(--text-color-1);
  font-weight: var(--fw-semibold);
  margin-bottom: var(--size-8);
}
</style>
