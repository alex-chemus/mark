<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { UsersList } from '@/shared';
import { IStaff } from '../types';
import NewTeacher from '../NewTeacher/NewTeacher.vue'

const props = defineProps<{
  teachers?: IStaff[]
}>()

const showAuth = ref(false)

const getTeachersUIDs = computed(() => {
  return props.teachers?.map(teacher => teacher.userID)
})
</script>

<template>
  <main class="teachers">
    <div class="list-wrapper">
      <users-list v-if="teachers" :users="getTeachersUIDs" />
    </div>
    <button class="add-button" @click="showAuth = true">Добавить</button>
    <new-teacher v-if="showAuth" @toggle="showAuth = !showAuth" />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.teachers {
  @include small-container;
  margin-bottom: var(--size-15);
}

.list-wrapper {
  margin-bottom: var(--size-12);

  @include md {
    margin-bottom: var(--size-9);
  }
}

.add-button {
  @include button-hollow;
}
</style>
