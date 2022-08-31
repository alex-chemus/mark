<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { ITeacherCreds } from '../types'

defineProps<{
  credentials: ITeacherCreds
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <section class="teacher-credentials">
    <dl>
      <dt>Логин</dt>
      <dd>{{ credentials.textID }}</dd>

      <dt>Пароль</dt>
      <dd>{{ credentials.password }}</dd>
    </dl>

    <button class="button" @click="emit('close')">Закрыть</button>
  </section>
  <div class="backdrop" />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.teacher-credentials {
  @include modal;
}

.backdrop {
  @include backdrop;
  background-color: rgb(0 0 0 / .3);
}

.button {
  @include button-hollow;
  margin: 0 auto;
  margin-top: 0;
  width: min-content;
}

dl {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-auto-columns: min-content;
  grid-gap: var(--size-6);
  margin-bottom: var(--size-10);

  @include sm {
    display: block;
    margin-bottom: 0;
  }
}

dt,
dd {
  font-size: var(--size-6);

  @include md {
    font-size: var(--size-5);
  }
}

dt {
  font-family: var(--ff-montserrat);
  color: var(--text-color-1);
  //margin-bottom: var(--size-2);

  @include sm {
    margin-bottom: var(--size-2);
  }
}

dd {
  font-family: var(--ff-open-sans);
  color: var(--text-color-2);
  //margin-bottom: var(--size-10);
  margin-left: var(--size-3);
  word-break: break-all;

  @include sm {
    margin-bottom: var(--size-10);
    margin-left: 0;
  }
}
</style>
