<script lang="ts" setup>
import {
  inject, ref, computed, onMounted, watch
} from 'vue'
import { Key, IGroupInfo } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useFetchGroupsList from '../hooks/useFetchGroupsList'

const key = inject<Key>('key')
const { state, } = useStore(key)

const route = useRoute()
const router = useRouter()

const opened = ref(false)

//const { groupsList, fetchGroupsList } = useFetchGroupsList()
const updatePath = async () => {
  //await fetchGroupsList()
  if (state.groups && !route.params.groupID) {
    router.push({ path: `/cloud/groups/${state.groups[0].groupID}` })
  }
}
onMounted(updatePath)
watch(() => state.userInfo, updatePath)
watch(() => route.path, () => {
  if (route.path === '/cloud/groups') updatePath()
})

const groupID = ref<number>(+(route.params.groupID as string))
watch(
  () => route.params.groupID,
  () => groupID.value = +(route.params.groupID as string)
)

const currentGroupName = computed(() => {
  if (!state.groups) return ''
  return state.groups
    .find(group => group.groupID === groupID.value)
    ?.groupName
})

const onclick = (id: number) => {
  router.push({ path: `/cloud/groups/${id}` })
  opened.value = false
}
</script>

<template>
  <div v-if="state.groups" class="popup-wrapper">
    <button class="popup-button desktop" @click="opened = !opened">
      <span>{{ currentGroupName }}</span>
      <svg
        width="22" height="22" viewBox="0 0 22 22"
        :class="opened ? 'opened' : ''"
      >
        <use href="@/assets/tabler-sprite.svg#tabler-chevron-down" />
      </svg>
    </button>

    <button class="popup-button mobile" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-list" />
      </svg>
    </button>

    <transition name="popup-animation">
      <ul class="popup" v-show="opened">
        <li
          v-for="group in state.groups" :key="group.groupID"
          :class="group.groupID === groupID ? 'selected' : ''"
        >
          <!--<button @click="setCurrentGroup(group.groupID)">-->
          <button @click="onclick(group.groupID)">
            {{ group.groupName }}
          </button>
        </li>
      </ul>
    </transition>
    <transition name="backdrop-animation">
      <!-- eslint-disable -->
      <div v-show="opened" class="backdrop" @click="opened = !opened" />
      <!-- eslint-enable -->
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.popup-button {
  @include button;
  padding-bottom: var(--size-3);

  @include flex;
  @include gap(var(--size-3));

  svg {
    transition: var(--fast);
  }

  &:focus svg {
    color: var(--color-accent);
  }
  svg.opened {
    transform: rotate(180deg);
    color: var(--color-accent);
  }

  &.desktop {
    @include md {
      display: none;
    }
  }

  &.mobile {
    display: none;
    @include md {
      display: flex;
    }
  }
}

.popup {
  width: max-content;
  //max-height: 200px;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--bg-color-1);
  border-radius: 0 0 12px 12px;
  border: 1px solid var(--element-color);
  //border: 1px solid red;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 2;
  padding: var(--size-9);
  @include gap(var(--size-6), 'column');

  @include md {
    @include popup('right')
  }
}

li.selected {
  @include md {
    padding-left: var(--size-3);
    position: relative;
    @include sideline;
  }
}

li button {
  text-align: left;
  padding: 0;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--text-color-1);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  transition: var(--fast);
  cursor: pointer;

  @include md {
    font-size: var(--size-5);
    width: max-content;
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.backdrop {
  @include backdrop;
}

.popup-animation {
  @include md {
    @include mobile-sidebar-animation;
  }
}

.backdrop-animation {
  @include md {
    @include mobile-backdrop-animation;
  }
}
</style>
