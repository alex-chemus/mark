<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { User } from '@/shared'
import ReportCheckbox from '../ReportCheckbox/ReportCheckbox.vue'

const props = defineProps<{
  avatar: string,
  fullName: string,
  uid?: number | string,
  badgeText?: string,
  isPresent: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button class="report-user" @click="emit('toggle')">
    <report-checkbox :state="isPresent" />
    <user :avatar="avatar" :full-name="fullName" :badge-text="badgeText" />
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.report-user {
  @include button;
  width: 100%;
  @include flex(flex-start, center);
  @include gap(var(--size-3));
}
</style>
