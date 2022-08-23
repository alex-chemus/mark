<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Alert } from '@/shared'
import { GroupNavItem, IGroupInfo } from '@/features/groups/types'
import { GroupPopup, GroupsSidebar } from '@/features/groups/common'
import useShareGroup from '@/features/groups/hooks/useShareGroup'

const props = defineProps<{
  groupNavItem: GroupNavItem,
  groupInfo: IGroupInfo,
  groupsList: number[] | null | undefined
}>()

const emit = defineEmits<{
  (e: 'switch', value: GroupNavItem): void,
  (e: 'change-group', value: number): void
}>()

const { message, shareGroup } = useShareGroup()
const share = () => shareGroup({ groupID: props.groupInfo.groupID })

const opened = ref(false)
const sidebarOpened = ref(false)

const setSelection = (item: GroupNavItem) => {
  return item === props.groupNavItem ? 'selected' : ''
}
</script>

<template>
  <nav class="admin-group-nav">
    <ul>
      <li :class="setSelection('Студенты')">
        <button
          @click="emit('switch', 'Студенты')"
          class="nav-button"
        >Студенты</button>
      </li>
      <li :class="setSelection('Преподаватели')">
        <button
          @click="emit('switch', 'Преподаватели')"
          class="nav-button"
        >Преподаватели</button>
      </li>
    </ul>

    <div class="control-group">
      <button class="sidebar-button button" @click="sidebarOpened = true">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#sidebar" />
        </svg>
      </button>

      <button class="share-button button" @click="share">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#share-2" />
        </svg>
      </button>

      <button class="popup-button button" @click="opened = !opened">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#more-vertical" />
        </svg>
      </button>

      <group-popup
        :opened="opened"
        :group-info="groupInfo"
        @toggle="opened = !opened"
      />

      <alert :text="message" />
    </div>

    <div v-show="sidebarOpened" class="sidebar-popup">
      <groups-sidebar
        v-if="groupsList"
        :groupsIDs="groupsList"
        @change-group="value => emit('change-group', value)"
      />
    </div>
    <!-- eslint-disable -->
    <div
      v-show="sidebarOpened"
      class="sidebar-backdrop"
      @click="sidebarOpened = !sidebarOpened"
    />
    <!-- eslint-disable -->
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.admin-group-nav {
  @include flex(space-between, flex-end);
  border-bottom: 1px solid var(--element-color);
  position: relative;
  margin-bottom: var(--size-11);
}


ul {
  margin: 0;
  padding: 0;
  list-style: none;
  @include flex(flex-start, baseline);
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-8));
  }
}

li {
  padding-bottom: var(--size-3);
  position: relative;

  &.selected::after {
    @include underline;
  }

  &.selected button {
    color: var(--color-accent);
  }
}

.nav-button {
  @include button;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  @include md {
    font-size: var(--size-5);
  }
}

.control-group {
  @include flex(flex-start, flex-end);
  @include gap(var(--size-4));
  padding-bottom: var(--size-3);
}

.sidebar-popup {
  @include md {
    @include flex(flex-start, stretch, column);
    @include popup('right', 2);
    padding: var(--size-10);
  }
  //overflow-y: scroll;
  max-height: calc(100vh - var(--size-10)*2);
  //overscroll-behavior: contain;
  @include scrollbar;
}

.sidebar-backdrop {
  @include backdrop;
}

.button {
  @include button(var(--text-color-2));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  svg {
    @include md {
      width: 19px;
      height: 19px;
    }
  }
}

.share-button {
  @include md {
    display: none;
  }
}

.sidebar-button {
  display: none;

  @include md {
    display: flex;
  }
}
</style>
