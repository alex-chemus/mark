<script lang="ts" setup>
import {
  defineProps, defineEmits, inject, computed
} from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store';
import { NavItem } from '../types'
import { groupKey } from '../keys'
import CloudPopup from '../CloudPopup/CloudPopup.vue'

const props = defineProps<{
  currentNav: NavItem
}>()

const emit = defineEmits<{
  (e: 'switch', value: NavItem): void
}>()

const key = inject<Key>('key')
const { getters } = useStore(key)

const group = inject(groupKey)
//const groupsList = inject('groupsList')

const role = computed(() => {
  if (getters.roles.includes('teacher')) return 'teacher'
  else return 'user'
})

const setSelection = (item: NavItem) => {
  return item === props.currentNav ? 'selected' : ''
}
</script>

<template>
  <nav class="cloud-nav">
    <ul class="links-list">
      <li class="nav-link" :class="setSelection('Мое облако')">
        <button @click="emit('switch', 'Мое облако')">Мое облако</button>
      </li>
      <li class="nav-link" :class="setSelection('Облако группы')">
        <button @click="emit('switch', 'Облако группы')">Облако группы</button>
      </li>
    </ul>

    <div v-show="currentNav === 'Облако группы'">
      <p v-if="role === 'user'" class="group-name">{{ group }}</p>
      <cloud-popup v-else />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-nav {
  @include flex(space-between, center);
  margin: var(--size-12) 0 var(--size-15);
  border-bottom: 1px solid var(--element-color);
  position: relative;

  @include md {
    margin: var(--size-9) 0 var(--size-11);
  }
}

.links-list {
  @include flex;
  list-style: none;
  padding: 0;
  margin: 0;
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-8));
  }
}

.nav-link button {
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  transition: var(--fast);
  color: var(--text-color-1);
  cursor: pointer;

  @include md {
    font-size: var(--size-5);
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.nav-link {
  position: relative;
  padding-bottom: var(--size-3);
}

.nav-link.selected {
  button {
    color: var(--color-accent);
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-accent);
    position: absolute;
    bottom: -1px;
    left: 0;
  }
}

.group-name {
  padding-bottom: var(--size-3);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);

  @include md {
    display: none;
  }
}
</style>
