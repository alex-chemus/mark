<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed
} from 'vue'

const props = defineProps<{
  groups: {
    groupID: number,
    groupName: string
  }[],
  currentGroupID: number | null
}>()

const emit = defineEmits<{
  (e: 'switch', groupID: number | null): void
}>()

const filterOpened = ref(false)

const selectFilter = (groupID: number | null) => {
  emit('switch', groupID)
  filterOpened.value = false
}

const currentGroupName = computed(() => {
  if (props.currentGroupID)
    return props.groups
      .find(g => g.groupID === props.currentGroupID)?.groupName ?? null
  else return null
})
</script>

<template>
  <button class="filter-button" @click="filterOpened = !filterOpened">
    <span>{{ currentGroupName ?? 'Все' }}</span>
    <svg width="24" height="24">
      <use href="@/assets/tabler-sprite.svg#tabler-filter" />
    </svg>
  </button>

  <div v-if="filterOpened" class="filter-dropdown">
    <!--<button @click="selectFilter('all')">Все</button>
    <button @click="selectFilter('present')">Присутствуют</button>
    <button @click="selectFilter('absent')">Отсутствуют</button>-->
    <button @click="selectFilter(null)">Все</button>
    <button v-for="group in groups" :key="group.groupID" @click="selectFilter(group.groupID)">
      {{ group.groupName }}
    </button>
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
