<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { GroupNavItem } from '../types'
import GroupPopup from '../GroupPopup/GroupPopup.vue'
import GroupsSidebar from '../GroupsSidebar/GroupsSidebar.vue'

const props = defineProps<{
  groupNavItem: GroupNavItem,
  groupName: string
}>()

const emit = defineEmits<{
  (e: 'switch', value: GroupNavItem): void
}>()

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

      <button class="share-button button">
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
        :group-name="groupName"
        :user-can-share="true"
        @toggle="opened = !opened"
      />
    </div>

    <div v-show="sidebarOpened" class="sidebar-popup">
      <groups-sidebar />
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
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-accent);
    position: absolute;
    top: 100%;
    left: 0;
  }

  &.selected button {
    color: var(--color-accent);
  }
}

.nav-button {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;

  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  cursor: pointer;
  transition: var(--fast);

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
  display: none;
  min-width: 300px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70vw;
  min-width: 250px;
  background-color: var(--bg-color-1);
  @include flex(flex-start, stretch, column);
  padding: var(--size-10);
  z-index: 2;

  @include md {
    display: flex;
  }
}

.sidebar-backdrop {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  cursor: pointer;
  background-color: rgba(0 0 0 / .15);
}

.button {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0;
  //margin: 0;
  @include flex;
  cursor: pointer;
  transition: var(--fast);
  color: var(--text-color-2);

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
