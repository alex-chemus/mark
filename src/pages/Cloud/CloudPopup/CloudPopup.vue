<script lang="ts" setup>
import {
  computed, inject, ref
} from 'vue'
import {
  groupsListKey, currentGroupKey, setCurrentGroupKey
} from '../keys'

const groupsList = inject(groupsListKey, ref([]))
const currentGroup = inject(currentGroupKey, ref(1))
// eslint-disable-next-line
const setCurrentGroup = inject(setCurrentGroupKey, (value) => {})

const opened = ref(false)

const currentGroupName = computed(() => {
  return groupsList.value
    .find(group => group.id === currentGroup.value)
    .name
})
</script>

<template>
  <div class="popup-wrapper">
    <button class="popup-button desktop" @click="opened = !opened">
      <span>{{ currentGroupName }}</span>
      <svg
        width="22" height="22" viewBox="0 0 22 22"
        :class="opened ? 'opened' : ''"
      >
        <use href="~/feather-icons/dist/feather-sprite.svg#chevron-down" />
      </svg>
    </button>

    <button class="popup-button mobile" @click="opened = !opened">
      <svg width="19" height="19" viewBox="0 0 19 19">
        <use href="~/feather-icons/dist/feather-sprite.svg#list" />
      </svg>
    </button>

    <ul class="popup" v-show="opened">
      <li
        v-for="group in groupsList" :key="group.id"
        :class="group.id === currentGroup ? 'selected' : ''"
      >
        <button @click="setCurrentGroup(group.id)">
          {{ group.name }}
        </button>
      </li>
    </ul>
    <!-- eslint-disable -->
    <div v-show="opened" class="backdrop" @click="opened = !opened" />
    <!-- eslint-enable -->
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.popup-button {
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  padding-bottom: var(--size-3);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);

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
  max-height: 200px;
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
    width: 70vw;
    min-width: 250px;
    min-height: 100vh;
    border-radius: 0;
    position: fixed;
    top: 0;
    right: 0;
  }
}

li.selected {
  @include md {
    padding-left: var(--size-3);
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-accent);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

li button {
  //padding: var(--size-3) var(--size-6);
  //padding: var(--size-9);
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  cursor: pointer;

  @include md {
    background-color: rgb(0 0 0 / .15);
  }
}
</style>
