<script lang="ts" setup>
import { ref, computed } from 'vue'
import PrimaryNav from '../PrimaryNav/PrimaryNav.vue'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.vue'
import Popup from '../Popup/Popup.vue'
import MobilePopup from '../MobilePopup/MobilePopup.vue'

const opened = ref(false)

const openClass = computed(() => {
  return opened.value ? 'opened' : ''
})
</script>

<template>
  <header>
    <div class="container">
      <button class="logo">Mark</button>

      <div class="primary-nav desktop">
        <primary-nav />
      </div>

      <div class="controls desktop">
        <theme-switcher />
        <button class="popup-btn" @click="opened = !opened">
          <!-- todo later -->
          <div class="placeholder"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :class="openClass">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <popup
          :opened="opened"
          @toggle="opened = !opened"
        />
      </div>

      <div class="controls mobile">
        <theme-switcher />
        <button class="popup-btn" @click="opened = !opened">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <mobile-popup
          :opened="opened"
          @toggle="opened = !opened"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

header {
  box-shadow: var(--section-shadow);
}

header .container {
  @include container;
  display: grid;
  grid-template-columns: 1fr 4fr max-content;
  grid-gap: var(--size-9);
  padding: var(--size-1) 0;
  position: relative;

  @include lg {
    padding: 0;
  }

  @include md {
    @include flex(space-between, center);
  }
}

.logo {
  align-self: center;
  justify-self: start;
  font-family: var(--ff-montserrat);
  font-size: 2rem;
  color: var(--text-color-1);
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: var(--fast);
  outline: none;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  @include md {
    font-size: var(--size-8);
  }
}

.primary-nav {
  @include flex(flex-start, center);
}

.controls {
  @include flex(flex-start, center);
  @include gap(var(--size-8));

  &.mobile {
    display: none;

    @include md {
      display: flex;
    }
  }

  @include md {
    @include gap(var(--size-5));
  }
}

.popup-btn {
  color: var(--text-color-2);
  @include flex(flex-start, center);
  @include gap(4px);
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: var(--fast);
  padding: 0;

  &:focus {
    //outline: 1px solid var(--color-accent);
    color: var(--color-accent);
  }
}

.placeholder {
  border-radius: 100vmax;
  background-color: var(--color-neutral-3);
  width: 40px;
  aspect-ratio: 1;
}

svg.opened {
  transform: rotate(180deg);
}

.desktop {
  @include md {
    display: none !important;
  }
}
</style>
