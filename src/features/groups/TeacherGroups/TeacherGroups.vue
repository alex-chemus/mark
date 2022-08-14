<script lang="ts" setup>
import { ref } from 'vue'
import GroupsSidebar from '../GroupsSidebar/GroupsSidebar.vue'
import GroupPopup from '../GroupPopup/GroupPopup.vue'
import UsersList from '../UsersList/UsersList.vue'
import { IGroupUser } from '../types'

const groupName = ref('Название группы')
const popupOpened = ref(false)
const sidebarOpened = ref(false)

const students = ref<IGroupUser[]>([
  { fullName: 'Имя Фамилия', badgeText: 'Староста' },
  { fullName: 'Имя Фамилия', badgeText: 'Зам. старосты' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
  { fullName: 'Имя Фамилия' },
])
</script>

<template>
  <main class="teacher-groups">
    <div class="desktop-sidebar">
      <groups-sidebar />
    </div>

    <section class="main">
      <div class="title-group">
        <button class="sidebar-button" @click="sidebarOpened = !sidebarOpened">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <use href="~/feather-icons/dist/feather-sprite.svg#sidebar" />
          </svg>
        </button>

        <h1 class="group-title">{{ groupName }}</h1>

        <button class="info-button" @click="popupOpened = !popupOpened">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <use href="~/feather-icons/dist/feather-sprite.svg#info" />
          </svg>
        </button>

        <group-popup
          :opened="popupOpened"
          :group-name="groupName"
          @toggle="popupOpened = !popupOpened"
        />

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
      </div>

      <users-list :users="students" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

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
  @include md {
    display: none;
  }
}

.sidebar-popup {
  display: none;
  min-width: 300px;
  position: fixed;
  top: 0;
  left: 0;
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
    @include gap(var(--size-3));
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
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--text-color-2);

  @include md {
    display: flex;
  }
}

.info-button {
  //margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  @include flex;
  color: var(--text-color-2);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}
</style>
