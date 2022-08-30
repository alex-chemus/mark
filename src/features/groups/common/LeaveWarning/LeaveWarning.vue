<script lang="ts" setup>
import { defineProps, defineEmits, inject } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useFetch } from '@/shared'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const key = inject<Key>('key')
const { dispatch, state } = useStore(key)

const leave = async () => {
  if (!state.userInfo || !state.userInfo.additionalData.inGroups.length) return
  await useFetch({
    path: 'markMethods/group.leave',
    data: {
      groupID: state.userInfo.additionalData.inGroups[0]
    }
  })
  await dispatch('fetchUserInfo')
  emit('close')
}
</script>

<template>
  <section v-if="isOpen" class="leave-warning">
    <svg width="40" height="40" viewBox="0 0 40 40">
      <use href="@/assets/tabler-sprite.svg#tabler-alert-triangle" />
    </svg>

    <p>Вы уверены, что хотите покинуть гурппу?</p>

    <div class="button-wrapper">
      <button class="button-hollow" @click="leave">Покинуть</button>
      <button class="button-fill" @click="emit('close')">Остаться</button>
    </div>
  </section>
  <!-- eslint-disable -->
  <div
    v-if="isOpen"
    class="backdrop"
    @click="emit('close')"
  />
  <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.leave-warning {
  @include modal(4);
  @include flex(flex-start, center, column);

  svg {
    color: var(--color-accent);
  }
}

.backdrop {
  @include backdrop(3);
  background-color: rgb(0 0 0 / .3);
}

p {
  font-size: var(--size-6);
  font-family: var(--ff-open-sans);
  font-weight: var(--fw-semibold);
  color: var(--text-color-1);
}

.button-wrapper {
  @include flex(space-between, center);
  width: 100%;
}

.button-hollow {
  @include button-hollow;
}

.button-fill {
  @include button-fill;
}
</style>
