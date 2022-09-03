<script lang="ts" setup>
import {
  ref, inject, onBeforeMount, watch
} from 'vue'
import { Key } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { UsersList, Alert } from '@/shared'
import { GroupPopup, GroupsSidebar } from '@/features/groups/common'
import useFetchGroupInfo from '@/features/groups/hooks/useFetchGroupInfo'
import useShareGroup from '@/features/groups/hooks/useShareGroup'

const key = inject<Key>('key')
const { state } = useStore(key)

const route = useRoute()
const router = useRouter()

const groupsIDs = ref<number[]>([])
const currentGroup = ref<number>(0)
const noGroups = ref(false)

const getGroups = () => {
  if (route.path !== '/' && !route.path.startsWith('/groupID')) return
  if (!state.userInfo) return
  groupsIDs.value = [
    ...state.userInfo.additionalData.inGroups,
    ...state.userInfo.additionalData.ownGroups
  ]

  if (groupsIDs.value.length === 0) {
    noGroups.value = true
    return
  }

  const groupID = +(route.params.groupID as string)
  if (route.params.groupID && groupsIDs.value.includes(groupID)) {
    currentGroup.value = +(route.params.groupID as string)
  } else {
    router.push({ path: `/groupID/${groupsIDs.value[0]}` })
  }
}
watch([
  () => state.userInfo,
  () => route.params.groupID
], getGroups)
onBeforeMount(getGroups)

const { groupInfo, fetchGroupInfo } = useFetchGroupInfo()
const reload = () => {
  if (currentGroup.value) {
    fetchGroupInfo({
      currentGroup: currentGroup.value
    })
  }
}
watch(currentGroup, reload)

const { message, shareGroup, invitationLink } = useShareGroup()
const share = () => groupInfo.value && shareGroup({
  groupID: groupInfo.value.groupID,
  url: location.origin // eslint-disable-line
})

const popupOpened = ref(false)
const sidebarOpened = ref(false)
</script>

<template>
  <main v-if="noGroups" class="no-groups">
    Вы не состоите ни в одной группе
  </main>

  <main v-else class="teacher-groups">
    <div class="desktop-sidebar">
      <groups-sidebar
        :groupsIDs="groupsIDs"
        :current-group="currentGroup"
        @change-group="value => router.push({ path: `/groupID/${value}` })"
      />
    </div>

    <section v-if="groupInfo" class="main">
      <div class="title-group">
        <button class="sidebar-button" @click="sidebarOpened = !sidebarOpened">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="@/assets/tabler-sprite.svg#tabler-layout-sidebar" />
          </svg>
        </button>

        <h1 class="group-title">{{ groupInfo.groupName }}</h1>

        <button class="share-button" @click="share">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-share" />
          </svg>
        </button>

        <button class="info-button" @click="popupOpened = !popupOpened">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-info-circle" />
          </svg>
        </button>

        <group-popup
          :opened="popupOpened"
          :group-info="groupInfo"
          @toggle="popupOpened = !popupOpened"
        />

        <alert :text="message" :observer="invitationLink" />
      </div>

      <div v-show="sidebarOpened" class="sidebar-popup">
        <groups-sidebar
          :groupsIDs="groupsIDs"
          :current-group="currentGroup"
          @change-group="value => router.push({ path: `/groupID/${value}` })"
        />
      </div>
      <!-- eslint-disable -->
      <div
        v-show="sidebarOpened"
        class="sidebar-backdrop"
        @click="sidebarOpened = !sidebarOpened"
      />
      <!-- eslint-disable -->
      <users-list :users="groupInfo.users.students" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.no-groups {
  /*width: 100%;
  height: 100%;
  @include container;
  @include flex(center, center);*/
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

.teacher-groups {
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-gap: var(--size-14);
  margin-bottom: var(--size-15);

  @include container;
  margin-top: var(--size-15);

  @include lg {
    grid-template-columns: 200px 1fr;
  }

  @include md {
    display: block;
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
}

.desktop-sidebar {
  @include sticky;
  align-self: start;
  @include scrollbar;
  @include md {
    display: none;
  }
}

.sidebar-popup {
  display: none;
  @include scrollbar;
  //max-height: calc(100vh - var(--size-10)*2);

  @include md {
    @include flex(flex-start, stretch, column);
    @include popup('left');
    padding: var(--size-10);
  }
}

.sidebar-backdrop {
  @include backdrop(1);
}

.title-group {
  @include flex(space-between, center);
  border-bottom: 1px solid var(--element-color);
  padding-bottom: var(--size-3);
  margin-bottom: var(--size-11);
  position: relative;

  @include md {
    svg {
      width: 22px;
      height: 22px;
    }
  }

  @include md {
    @include gap(var(--size-4));
  }
}

.group-title {
  font-family: var(--ff-montserrat);
  font-size: var(--size-9);
  color: var(--text-color-1);

  @include md {
    font-size: var(--size-6);
  }
}

.sidebar-button {
  display: none;
  //margin: 0;
  margin-right: auto;

  @include md {
    @include button(var(--text-color-2));
  }
}

.info-button,
.share-button {
  @include button(var(--text-color-2));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.share-button {
  margin-left: auto;
  margin-right: var(--size-4);

  @include md {
    display: none;
  }
}
</style>
