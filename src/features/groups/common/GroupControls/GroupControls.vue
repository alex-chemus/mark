<script lang="ts" setup>
import { inject, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import CreateGroup from '../CreateGroup/CreateGroup.vue'

const key = inject<Key>('key')
const { getters } = useStore(key)

const opened = ref(false)

const title = computed(() => {
  return getters.roles.includes('administrator_of_institution')
    ? 'Созданные'
    : 'Мои группы'
})
</script>

<template>
  <div class="wrapper">
    <h2 class="group-name">{{ title }}</h2>
    <button class="add-button" @click="opened = true">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-plus" />
      </svg>
    </button>
    <create-group
      v-if="opened"
      @toggle="opened = !opened"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.wrapper {
  @include flex(space-between, center);
}

.group-name {
  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  font-weight: var(--fs-semibold);
  color: var(--text-color-1);

  @include md {
    font-size: var(--size-6);
  }
}

.add-button {
  @include button(var(--text-color-2));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  @include md {
    width: 22px;
    height: 22px;
  }
}
</style>
