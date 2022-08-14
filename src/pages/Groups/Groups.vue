<script lang="ts" setup>
import { inject } from 'vue'
import { Key } from '@/store'
import { Role } from '@/shared'
import { useStore } from 'vuex'
import { AdminGroups, TeacherGroups, StudentGroups } from '@/features/groups'

const key = inject<Key>('key')
const { state } = useStore(key)

const hasRole = (role: Role) =>
  state.userInfo?.additionalData.roles.includes(role)
</script>

<template>
  <!--<div>This is Groups</div>-->
  <!--<div v-if="hasRole('administrator_of_institution')">Админ УУ</div>
  <div v-else-if="hasRole('teacher')">Препод</div>
  <div v-else-if="hasRole('user')">Студент</div>-->
  <admin-groups v-if="hasRole('administrator_of_institution')" />
  <teacher-groups v-else-if="hasRole('teacher')" />
  <student-groups v-else-if="hasRole('user')" />
</template>
