<script lang="ts" setup>
import {
  defineProps, onMounted, ref
} from 'vue'
import { IFaculty } from '../types'
import AddDepartment from '../AddDepartment/AddDepartment.vue';

const opened = ref(false)
const button = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  if (!button.value) return
  button.value.addEventListener('click', () => {
    const panel = button.value?.nextElementSibling as HTMLElement
    if (!panel) return

    if (panel.style.maxHeight)
      panel.style.maxHeight = ''
    else
      panel.style.maxHeight = `${panel.scrollHeight}px`
  })
})

defineProps<{
  info: IFaculty
}>()
</script>

<template>
  <section class="faculty">
    <button class="title-group" @click="opened = !opened" ref="button">
      <h6 class="title">{{ info.facultyName }}</h6>
      <svg
        width="24" height="24" viewBox="0 0 24 24"
        :class="opened ? 'rotated' : ''"
      >
        <use href="@/assets/tabler-sprite.svg#tabler-chevron-down" />
      </svg>
    </button>

    <div class="departments">
      <ul class="deps-list">
        <li v-for="dep in info.departments" :key="dep.departmentID">
          {{ dep.departmentName }}
        </li>
      </ul>

      <add-department :facultyID="info.facultyID" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.title-group {
  @include flex(space-between, center);
  @include button;
  padding-bottom: var(--size-1);
  border-bottom: 1px solid var(--element-color);
  width: 100%;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  svg {
    transition: var(--fast);
  }

  svg.rotated {
    transform: rotate(180deg);
  }
}

.title {
  margin: 0;
  font-size: var(--size-8);
  font-family: var(--ff-montserrat);
  font-weight: var(--ff-semibold);
  color: var(--text-color-1);
  text-align: left;

  @include md {
    font-size: var(--size-6);
    margin-right: var(--size-3);
  }
}

.departments {
  max-height: 0;
  overflow: hidden;
  transition: max-height .2s ease-out;
}

.deps-list {
  margin: 0;
  padding: 0;
  margin-top: var(--size-8);
  list-style: none;
  @include gap(var(--size-6), 'column');

  li {
    font-family: var(--ff-open-sans);
    font-size: var(--size-6);
    color: var(--text-color-2);
  }
}
</style>
