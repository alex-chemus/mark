<script lang="ts" setup>
import { defineProps } from 'vue'
import { Badge } from '@/shared'

defineProps<{
  avatar: string,
  fullName: string,
  uid?: number,
  badgeText?: string,
  hideOnShrink?: boolean
}>()
</script>

<template>
  <section>
    <div class="group-user">
      <div v-if="avatar === ''" class="avatar" :class="hideOnShrink ? 'hide' : ''" />
      <img v-else :src="avatar" alt="Avatar" class="avatar" :class="hideOnShrink ? 'hide' : ''" >
      <div class="wrapper">
        <p class="name">{{ fullName }}</p>
        <div class="badge">
          <badge v-if="badgeText" :text="badgeText" />
        </div>
      </div>
    </div>
    <div v-if="badgeText" class="mobile-badge">{{ badgeText }}</div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.group-user {
  @include flex;
  @include gap(var(--size-3));
}

.mobile-badge {
  display: none;
  border-top: 1px solid var(--element-color);
  font-family: var(--ff-roboto);
  font-size: var(--size-4);
  color: var(--text-color-2);
  margin-top: var(--size-3);
  //text-align: right;
  padding-top: var(--size-1);

  @include sm {
    display: block;
  }
}

.wrapper {
  @include flex;
  flex-wrap: wrap;
  @include gap(var(--size-3));
}

.avatar {
  width: var(--size-13);
  aspect-ratio: 1;
  border-radius: 100vmax;
  background-color: var(--element-color);
  flex-shrink: 0;
  border: 1px solid var(--element-color);

  &.hide {
    @include sm {
      display: none;
    }
  }
}

.name {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
}

.badge {
  @include sm {
    display: none;
  }
}
</style>
