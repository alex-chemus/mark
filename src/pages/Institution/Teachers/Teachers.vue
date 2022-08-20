<script lang="ts" setup>
// eslint-disable-next-line
import { ref, defineProps, computed, onMounted } from 'vue'
import { UsersList, IGroupUser } from '@/shared';
import { IStaff } from '../types';
import NewTeacher from '../NewTeacher/NewTeacher.vue'

const props = defineProps<{
  teachers?: IStaff[]
}>()

/*onMounted(() => {
  console.log(props.teachers)
})*/

const showAuth = ref(false)

// will fetch data about teachers
/*const teachers = ref<IGroupUser[]>([
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
  { fullName: 'Сарычев Алексей ВАсильевич' },
])*/

const getTeachersUIDs = computed(() => {
  console.log(props.teachers)
  return props.teachers?.map(teacher => teacher.userID)
}) // eslint-disable-line
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
