<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { GroupNavItem } from '../types'
import GroupPopup from '../GroupPopup/GroupPopup.vue'

const props = defineProps<{
  groupNavItem: GroupNavItem,
  groupName: string
}>()

const emit = defineEmits<{
  (e: 'toggle', value: GroupNavItem): void
}>()

const opened = ref(false)

const setSelection = (item: GroupNavItem) => {
  return item === props.groupNavItem ? 'selected' : ''
}
</script>

<template>
  <nav class="student-group-nav">
    <ul>
      <li :class="setSelection('Студенты')">
        <button
          @click="emit('toggle', 'Студенты')"
          class="nav-button"
        >Студенты</button>
      </li>
      <li :class="setSelection('Преподаватели')">
        <button
          @click="emit('toggle', 'Преподаватели')"
          class="nav-button"
        >Преподаватели</button>
      </li>
    </ul>

    <div class="control-group">
      <p class="group-name">{{ groupName }}</p>

      <button class="popup-button" @click="opened = !opened">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#more-vertical" />
        </svg>
      </button>

      <group-popup
        :opened="opened"
        :user-can-leave="true"
        :group-name="groupName"
        @toggle="opened = !opened"
      />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.student-group-nav {
  @include container;
  @include flex(space-between, flex-end);
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  border-bottom: 1px solid var(--element-color);
  position: relative;
  //margin: var(--size-12) 0 var(--size-15);

  @include md {
    //margin: var(--size-9) 0 var(--size-11);
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
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

.group-name {
  font-family: var(--ff-open-sans);
  font-weight: var(--fw-semibold);
  font-size: var(--size-6);
  color: var(--text-color-1);

  @include md {
    display: none;
  }
}

.popup-button {
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
</style>
