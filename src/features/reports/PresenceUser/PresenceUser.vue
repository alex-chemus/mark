<script lang="ts" setup>
import { defineProps } from 'vue'
import { User } from '@/shared'

defineProps<{
  avatar: string,
  fullName: string,
  uid?: number,
  badgeText?: string,
  isPresent: boolean
}>()
</script>

<template>
  <div class="presence-user">
    <svg v-if="!isPresent" class="absent" width="24" height="24" viewBox="0 0 24 24">
      <use href="@/assets/tabler-sprite.svg#tabler-circle-x" />
    </svg>
    <svg v-else class="present" width="24" height="24" viewBox="0 0 24 24">
      <use href="@/assets/tabler-sprite.svg#tabler-circle-check" />
    </svg>
    <user :avatar="avatar" :full-name="fullName" :uid="uid" :badge-text="badgeText" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.presence-user {
  width: 100%;
  @include flex(flex-start, center);
  @include gap(var(--size-3));
}

svg.present {
  color: #37B24D;
}

svg.absent {
  color: #E03131;
}
</style>
