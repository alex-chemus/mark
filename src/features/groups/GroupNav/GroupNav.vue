<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { GroupNavItem } from '../types'

const props = defineProps<{
  groupNavItem: GroupNavItem,
  groupName?: string
  userCanLeave: boolean,
  userCanShare: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle', value: GroupNavItem): void
}>()

const setSelection = (item: GroupNavItem) => {
  return item === props.groupNavItem ? 'selected' : ''
}
</script>

<template>
  <nav class="group-nav">
    <ul>
      <li :class="setSelection('Студенты')">
        <button @click="emit('toggle', 'Студенты')">Студенты</button>
      </li>
      <li :class="setSelection('Преподаватели')">
        <button @click="emit('toggle', 'Преподаватели')">Преподаватели</button>
      </li>
    </ul>

    <div class="control-group">
      <p v-if="groupName">{{ groupName }}</p>

      <button v-if="userCanShare" class="control-button">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#share-2" />
        </svg>
      </button>

      <button v-if="userCanLeave" class="control-button">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#more-vertical" />
        </svg>
      </button>
      <button v-else class="control-button">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#info" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

@import '@/style/style.scss';

.group-nav {
  @include container;
  @include flex(space-between, flex-end);
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  border-bottom: 1px solid var(--element-color);
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

button {
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

.control-group {
  @include flex(flex-start, flex-end);
  @include gap(var(--size-4));
  padding-bottom: var(--size-3);
}

.control-button {
  @include flex;
}
</style>
