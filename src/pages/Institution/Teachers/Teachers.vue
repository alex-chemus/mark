<script lang="ts" setup>
import { ref } from 'vue'
import { UsersList, IGroupUser } from '@/shared';
import NewTeacher from '../NewTeacher/NewTeacher.vue'

const showAuth = ref(false)

// will fetch data about teachers
const teachers = ref<IGroupUser[]>([
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
])
</script>

<template>
  <main class="teachers">
    <div class="list-wrapper">
      <users-list :users="teachers" />
    </div>
    <button class="add-button" @click="showAuth = true">Добавить</button>
  </main>

  <new-teacher v-if="showAuth" @toggle="showAuth = !showAuth" />
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
