<script lang="ts" setup>
import { defineProps } from 'vue'
import { IGroupUser } from '../types'
import GroupUser from '../GroupUser/GroupUser.vue'

const props = defineProps<{
  users: IGroupUser[] // todo: типизировать
}>()
</script>

<template>
  <ul class="users-list">
    <li v-for="(user, i) in users" :key="i" class="user">
      <group-user
        :full-name="user.fullName"
        :badge-text="user.badgeText"
        :img="user.img"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.users-list {
  margin: 0;
  padding: 0;
  list-style: none;
  @include gap(var(--size-8), 'column');
}
</style>
