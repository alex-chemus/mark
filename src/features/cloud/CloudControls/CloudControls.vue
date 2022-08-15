<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps<{
  userCanUpload: boolean,
  isRoot: boolean,
  dirName: string
}>()

const emit = defineEmits<{
  (e: 'up'): void
}>()

const input = ref<HTMLInputElement | null>(null)

const uploadFiles = () => {
  if (input.value && input.value.files?.length) {
    const form = new FormData()

    const { files } = input.value
    for (let i = 0; i < files.length; i++) {
      form.append(
        `file ${files[i].name}`,
        files[i],
        files[i].name
      )
    }
    console.log(form)
    // send form
  } else console.log('error')
}

const clickButton = () => {
  if (input.value) input.value.click()
}
</script>

<template>
  <section class="cloud-controls">
    <form v-if="userCanUpload">
      <!-- eslint-disable -->
      <input type="file" ref="input" @change="uploadFiles" />
      <button class="button" @click.prevent="clickButton">Добавить</button>
      <p class="text">Нажмите "Добавить" или перетащите файл</p>
      <!-- eslint-enable -->
    </form>

    <div class="nav-group">
      <p class="dir">{{ dirName }}</p>
      <button @click="emit('up')" class="up-button" :class="isRoot && 'disabled'">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use href="~/feather-icons/dist/feather-sprite.svg#corner-right-up" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.cloud-controls {
  //@include flex(space-between, center);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: var(--size-12);

  @include md {
    display: block;
    margin-bottom: var(--size-9);
  }
}

form {
  @include flex(flex-start, center);
  //@include gap(var(--size-5));

  @include md {
    display: none;
  }
}

input {
  display: none;
}

.button {
  padding: var(--size-2) var(--size-6);
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  color: var(--bg-color-1);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  border-radius: 100vmax;
  cursor: pointer;
  transition: var(--fast);

  &:hover {
    background-color: var(--color-accent);
  }
}

.text {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);
  margin-left: var(--size-5);
}

.nav-group {
  @include flex(flex-start, center);
  @include gap(var(--size-3));
  justify-self: end;

  @include md {
    justify-content: space-between;
  }
}

.dir {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-2);
}

.up-button {
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  @include flex;
  color: var(--text-color-2);
  cursor: pointer;
  transition: var(--fast);

  &:hover,
  &:focus {
    color: var(--color-accent)
  }

  &.disabled {
    color: var(--element-color);
  }
}
</style>
