<script lang="ts" setup>
import { defineProps } from 'vue'
import Faculty from '../Faculty/Faculty.vue'
import AddFaculty from '../AddFaculty/AddFaculty.vue'
import { IFaculty } from '../types'

defineProps<{
  faculties?: IFaculty[]
}>()
</script>

<template>
  <main class="faculties">
    <faculty
      v-for="(faculty, i) in faculties"
      :key="i"
      :info="faculty"
    />
    <!--<button class="add-button">Добавить факультет</button>-->
    <add-faculty />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.faculties {
  @include small-container;
  margin-bottom: var(--size-15);
  @include gap(var(--size-12), 'column');

  @include md {
    margin-bottom: var(--size-11);
  }
}
</style>
