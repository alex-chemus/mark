<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import LeaveWarning from '../LeaveWarning/LeaveWarning.vue'

defineProps<{
  userCanLeave?: boolean,
  userCanShare?: boolean,
  opened: boolean,
  groupName: string,
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

// will fetch data later
const institution = ref('*учебное заведение*')
const specialty = ref('*специальность*')
const faculty = ref('*факультет*')

const leaving = ref(false)
</script>

<template>
  <section v-show="opened" class="group-popup">
    <div class="mobile-group">
      <h6>{{ groupName }}</h6>
      <button v-if="userCanShare" class="share-button">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#share-2" />
        </svg>
      </button>
    </div>

    <dl class="list">
      <dt>{{ institution }}</dt>
      <dd>Учебное учреждение</dd>

      <dt>{{ specialty }}</dt>
      <dd>Специальность</dd>

      <dt>{{ faculty }}</dt>
      <dd>Факультет</dd>
    </dl>

    <button v-if="userCanLeave" class="logout-btn" @click="leaving = true">
      <svg width="22" height="22" viewBox="0 0 22 22">
        <use href="~/feather-icons/dist/feather-sprite.svg#log-out" />
      </svg>
      <span>Выйти из группы</span>
    </button>
  </section>

  <!-- eslint-disable -->
  <div 
    v-show="opened"
    class="backdrop" 
    @click="emit('toggle')"
  />
  <!-- eslint-enable -->

  <leave-warning
    :is-open="leaving"
    @cancel="leaving = false"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.group-popup {
  min-width: 300px;
  width: fit-content;
  position: absolute;
  top: 100%;
  right: 0%;
  z-index: 2;
  background-color: var(--bg-color-1);
  border-radius: 0 0 var(--size-4) var(--size-4);
  overflow: hidden;
  //box-shadow: var(--element-shadow);
  border: 1px solid var(--element-color);

  @include md {
    @include flex(flex-start, stretch, column);
    @include popup('right');
  }
}

.mobile-group {
  //width: 100%;
  display: none;
  margin-left: var(--size-10);
  margin-right: var(--size-10);
  padding: var(--size-10) 0;
  border-bottom: 1px solid var(--element-color);

  @include md {
    @include flex(space-between, center);
  }

  h6 {
    margin: 0;
    padding: 0;
    font-family: var(--ff-open-sans);
    font-size: var(--size-6);
    color: var(--text-color-1);
  }
}

.share-button {
  @include button(var(--text-color-2));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: var(--size-10);
  @include flex(flex-start, flex-start, column);
  //@include gap(var(--size-9), 'column');
}

dt {
  margin-bottom: var(--size-3);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
}

dd {
  margin-top: 0;
  font-family: var(--ff-roboto);
  font-size: var(--size-4);
  color: var(--text-color-2);

  &:not(:last-child) {
    margin-bottom: var(--size-9);
  }
}

.logout-btn {
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-1) var(--size-10);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }

  @include md {
    margin-top: auto;
  }
}

.backdrop {
  @include backdrop(1);
}
</style>
