<script lang="ts" setup>
import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>()

const root = document.querySelector(':root') as HTMLElement

onMounted(() => {
  theme.value = root.getAttribute('data-theme') as Theme
})

const toggle = () => {
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
    <svg xmlns="http://www.w3.org/2000/svg" class="icon desktop" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
      <path d="M6.343 17.657l-1.414 1.414"></path>
      <path d="M6.343 6.343l-1.414 -1.414"></path>
      <path d="M17.657 6.343l1.414 -1.414"></path>
      <path d="M17.657 17.657l1.414 1.414"></path>
      <path d="M4 12h-2"></path>
      <path d="M12 4v-2"></path>
      <path d="M20 12h2"></path>
      <path d="M12 20v2"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon mobile" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path>
      <path d="M6.343 17.657l-1.414 1.414"></path>
      <path d="M6.343 6.343l-1.414 -1.414"></path>
      <path d="M17.657 6.343l1.414 -1.414"></path>
      <path d="M17.657 17.657l1.414 1.414"></path>
      <path d="M4 12h-2"></path>
      <path d="M12 4v-2"></path>
      <path d="M20 12h2"></path>
      <path d="M12 20v2"></path>
    </svg>
  </button>

  <button v-else class="btn" @click="toggle">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon desktop" width="28" height="28" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon mobile" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.btn {
  @include button-icon;
}

/*svg {
  width: 28px;
  height: 28px;

  @include md {
    height: 24px;
    width: 24px;
  }
}*/

.icon.desktop {
  @include md {
    display: none;
  }
}

.icon.mobile {
  display: none;

  @include md {
    display: block;
  }
}
</style>
