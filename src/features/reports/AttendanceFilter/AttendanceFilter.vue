<script lang="ts" setup>
import {
  defineProps, defineEmits, computed, ref
} from 'vue'
import { AttendanceFilter } from '../types'

const props = defineProps<{
  filter: AttendanceFilter
}>()

const emit = defineEmits<{
  (e: 'switch', value: AttendanceFilter): void
}>()

const filterOpened = ref(false)

const filterTitle = computed(() => {
  if (props.filter === 'absent') return 'Отсутствуют'
  if (props.filter === 'present') return 'Присутствуют'
  return 'Все'
})

const selectFilter = (f: AttendanceFilter) => {
  //filter.value = f
  emit('switch', f)
  filterOpened.value = false
}
</script>

<template>
  <button class="filter-button" @click="filterOpened = !filterOpened">
    <span>{{ filterTitle }}</span>
    <svg width="24" height="24">
      <use href="@/assets/tabler-sprite.svg#tabler-filter" />
    </svg>
  </button>

  <div v-if="filterOpened" class="filter-dropdown">
    <button @click="selectFilter('all')">Все</button>
    <button @click="selectFilter('present')">Присутствуют</button>
    <button @click="selectFilter('absent')">Отсутствуют</button>
  </div>
  <div
    v-if="filterOpened"
    class="backdrop"
    @click="filterOpened = false"
    @keydown.esc="filterOpened = false"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.filter-button {
  @include button;
  //align-items: flex-end;
  @include gap(var(--size-1));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.filter-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 1px);
  background-color: var(--bg-color-1);
  box-shadow: var(--element-shadow);
  border-radius: 0 0 var(--size-4) var(--size-4);
  padding: var(--size-6);
  margin: 0;
  z-index: 2;
  width: fit-content;

  /*@include md {
    left: 0;
  }*/

  button {
    @include button;
    font-weight: normal;
    padding: var(--size-2);

    &:hover,
    &:focus {
      color: var(--color-accent);
    }
  }
}

.backdrop {
  @include backdrop;
  z-index: 1;

  @include md {
    background-color: transparent;
  }
}
</style>
