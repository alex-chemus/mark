<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  teacher: string, // name or ID, don't know yet
  date: string,
  text: string
}>()

</script>

<template>
  <article>
    <div class="wrapper">
      <div class="placeholder" />
      <div>
        <h6>{{ teacher }}</h6>
        <p><small>{{ date }}</small></p>
      </div>
    </div>

    <p class="text">{{ text }}</p>
  </article>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

article {
  @include small-container;
}

.placeholder {
  width: var(--size-13);
  aspect-ratio: 1;
  background-color: var(--element-color);
  border-radius: 100vmax;
}

.wrapper {
  @include flex(flex-start, flex-start);
  @include gap(var(--size-3));
  margin-bottom: var(--size-7);

  @include md {
    margin-bottom: var(--size-6);
  }
}

h6 {
  margin: 0;
  margin-bottom: var(--size-1);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  font-weight: var(--fw-semibold);
  color: var(--text-color-1);
}

p small {
  font-family: var(--ff-roboto);
  font-size: var(--size-5);
  color: var(--text-color-2);

  @include md {
    font-size: var(--size-4);
  }
}

.text {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);

  @include md {
    font-size: var(--size-5);
  }
}
</style>
