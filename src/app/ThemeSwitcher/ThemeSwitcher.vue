<script lang="ts" setup>
import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>()

const root = document.querySelector(':root') as HTMLElement

onMounted(() => {
  theme.value = root.getAttribute('data-theme') as Theme
})

const toggle = () => {
  console.log('toggle theme')
  if (theme.value === 'dark') { // toggle to light
    root.setAttribute('data-theme', 'light')
    theme.value = 'light'
  } else if (theme.value === 'light') { // toggle to dark
    root.setAttribute('data-theme', 'dark')
    theme.value = 'dark'
  } // else undefined
}

</script>

<template>
  <button v-if="theme === 'dark'" class="btn" @click="toggle">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 25.5C22.1421 25.5 25.5 22.1421 25.5 18C25.5 13.8579 22.1421 10.5 18 10.5C13.8579 10.5 10.5 13.8579 10.5 18C10.5 22.1421 13.8579 25.5 18 25.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 1.5V4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 31.5V34.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.32996 6.33002L8.45996 8.46002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M27.54 27.54L29.67 29.67" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.5 18H4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M31.5 18H34.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.32996 29.67L8.45996 27.54" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M27.54 8.46002L29.67 6.33002" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <button v-else class="btn" @click="toggle">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.5001 19.185C31.2641 21.7383 30.3059 24.1716 28.7375 26.2002C27.169 28.2288 25.0553 29.7687 22.6437 30.6398C20.232 31.5109 17.6221 31.6772 15.1193 31.1191C12.6166 30.5611 10.3246 29.3018 8.51143 27.4887C6.69828 25.6755 5.43901 23.3835 4.88096 20.8807C4.32291 18.378 4.48917 15.7681 5.36029 13.3564C6.2314 10.9448 7.77134 8.83105 9.79992 7.26263C11.8285 5.69421 14.2618 4.73596 16.8151 4.5C15.3202 6.5224 14.6009 9.01417 14.7879 11.5221C14.9749 14.0301 16.0559 16.3876 17.8342 18.1659C19.6125 19.9442 21.97 21.0252 24.478 21.2122C26.9859 21.3992 29.4777 20.6799 31.5001 19.185V19.185Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.btn {
  @include button-icon;
}

svg {
  @include lg {
    width: 28px;
    height: 28px;
  }

  @include md {
    height: 24px;
    width: 24px;
  }
}
</style>
