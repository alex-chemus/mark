<script lang="ts" setup>
import { ref } from 'vue'
import { GroupNavItem } from '../types';
//import GroupNav from '../GroupNav/GroupNav.vue'
import GroupUser from '../GroupUser/GroupUser.vue'
import StudentGroupNav from '../StudentGroupNav/StudentGroupNav.vue'

const currentNav = ref<GroupNavItem>('Студенты')
</script>

<template>
  <!--<group-nav
    :group-nav-item="currentNav"
    @toggle="navItem => currentNav = navItem"
    :user-can-leave="true"
    :user-can-share="false"
    group-name="*название группы*"
  />-->
  <student-group-nav
    :group-nav-item="currentNav"
    group-name="*название группы*"
    @toggle="navItem => currentNav = navItem"
  />

  <main class="student-group">
    <ul class="group-list">
      <li class="user">
        <group-user
          full-name="Имя Фамилия"
          badge-text="Староста"
        />
      </li>
      <li class="user">
        <group-user
          full-name="Имя Фамилия"
          badge-text="Зам. старосты"
        />
      </li>
      <li class="user">
        <group-user full-name="Имя Фамилия" />
      </li>
      <li class="user">
        <group-user full-name="Имя Фамилия" />
      </li>
      <li class="user">
        <group-user full-name="Имя Фамилия" />
      </li>
      <li class="user">
        <group-user full-name="Имя Фамилия" />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.student-group {
  @include small-container;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}

.group-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include gap(var(--size-8), 'column');
}

.user {}
</style>
