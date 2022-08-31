<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { UsersList } from '@/shared';
import { IStaff, ITeacherCreds } from '../types';
import NewTeacher from '../NewTeacher/NewTeacher.vue'
import TeacherCredentials from '../TeacherCredentials/TeacherCredentials.vue'

const props = defineProps<{
  teachers?: IStaff[]
}>()

const showAuth = ref(false)
const showCreds = ref(false)
const credentials = ref<ITeacherCreds | null>(null)

const setCreds = (value: ITeacherCreds) => {
  showAuth.value = false
  credentials.value = value
  showCreds.value = true
}

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
    <new-teacher
      v-if="showAuth"
      @toggle="showAuth = !showAuth"
      @teacher-credentials="setCreds"
    />
    <teacher-credentials
      v-if="credentials && showCreds"
      :credentials="credentials"
      @close="showCreds = false"
    />
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
