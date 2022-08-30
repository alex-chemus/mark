<script lang="ts" setup>
import {
  ref, computed, inject, onMounted, watch
} from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { IError, useFetch } from '@/shared'
import PrimaryNav from '../PrimaryNav/PrimaryNav.vue'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.vue'
import Popup from '../Popup/Popup.vue'
import MobilePopup from '../MobilePopup/MobilePopup.vue'

const key = inject<Key>('key')
const { commit, state } = useStore(key)

const opened = ref(false)

const openClass = computed(() => {
  return opened.value ? 'opened' : ''
})

const avatar = ref<string | null>(null)

const fetchInfo = async () => {
  console.log('fetch')
  const { response, error } = await useFetch({
    path: 'methods/account.getInfo'
  })

  if (error) {
    console.log(error)
    commit('setError', error as IError)
  } else {
    avatar.value = response.additionalData.avatarData.avatarCompressed
  }
}
watch(() => state.token, fetchInfo)
onMounted(fetchInfo)
</script>

<template>
  <header>
    <div class="container">
      <button class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 735.77 178">
          <g id="Слой_2" data-name="Слой 2" stroke="none">
            <circle class="cls-1" fill="#269dc6" cx="75.74" cy="75.74" r="75.74"/>
            <rect class="cls-2" fill="#085485" y="102.25" width="75.74" height="75.74"/>
            <rect class="cls-3" fill="#188bc7" width="75.74" height="75.74"/>
            <rect class="cls-4" fill="#3cbbed" x="75.74" width="75.74" height="75.74"/>
            <rect class="cls-5" fill="#056ca4" y="75.74" width="75.74" height="75.74"/>
            <path fill="currentColor" d="M204.69,155.49v-119h22.78l50.66,84H266.06l49.81-84h22.61l.34,119H313l-.17-79.39h4.76l-39.78,66.81H265.38L224.75,76.1h5.78v79.39Z"/>
            <path fill="currentColor" d="M351.4,155.49l53-119h27.2l53.21,119H456L412.43,50.43h10.88L379.62,155.49ZM377.92,130l7.31-20.91h61.2L453.91,130Z"/>
            <path fill="currentColor" d="M497.26,155.49v-119h51.51q16,0,27.54,5.18a40.43,40.43,0,0,1,17.85,14.88q6.29,9.69,6.29,23.12,0,13.26-6.29,22.86a40,40,0,0,1-17.85,14.71q-11.56,5.1-27.54,5.1H512.56l12.24-12.07v45.22Zm27.54-42.16-12.24-12.92h34.68q12.75,0,19-5.53t6.29-15.21q0-9.86-6.29-15.3t-19-5.44H512.56L524.8,45.84Zm48.11,42.16-29.75-43.18h29.41l30.09,43.18Z"/>
            <path fill="currentColor" d="M622.21,155.49v-119h27.37v119Zm24.65-27.2L645.33,96.5l56.95-60h30.6L681.54,91.74l-15.3,16.32Zm56.78,27.2-42.33-51.85,18-19.55,56.44,71.4Z"/>
          </g>
        </svg>
        <!--<img src="@/assets/mark_logo_black_font.svg" alt="Logo" height="40" />-->
      </button>

      <div class="primary-nav desktop">
        <primary-nav />
      </div>

      <div class="controls desktop">
        <theme-switcher />
        <button class="popup-btn" @click="opened = !opened">
          <img v-if="avatar" :src="avatar" alt="Avatar" class="img" />
          <div v-else class="img"></div>
          <svg height="24" width="24" viewBox="0 0 24 24" :class="openClass">
            <use xlink:href="@/assets/tabler-sprite.svg#tabler-chevron-down" />
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
          <svg height="24" width="24" viewBox="0 0 24 24">
            <use href="@/assets/tabler-sprite.svg#tabler-menu-2" />
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
  position: sticky;
  top: 0;
  background-color: var(--bg-color-1);
  z-index: 1;
  min-height: var(--size-12);
  @include flex(center, center);
}

header .container {
  @include container;
  display: grid;
  grid-template-columns: 1fr 4fr max-content;
  grid-gap: var(--size-10);
  padding: var(--size-1) 0;
  position: relative;

  @include md {
    //padding: var(--size-1) 0;
  }

  @include md {
    @include flex(space-between, center);
  }
}

.logo {
  @include flex;
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

  @include lg {
    font-size: 28px;
  }

  @include md {
    font-size: var(--size-9);
  }

  svg {
    height: var(--size-9);

    @include md {
      height: var(--size-8);
    }
  }
}

.primary-nav {
  @include flex(flex-start, stretch);
}

.controls {
  @include flex(flex-start, center);
  @include gap(var(--size-9));

  &.mobile {
    display: none;

    @include md {
      display: flex;
    }
  }

  @include lg {
    @include gap(var(--size-8));
  }

  @include md {
    @include gap(var(--size-6));
  }
}

.popup-btn {
  @include flex(flex-start, center);
  @include gap(4px);
  @include button(var(--text-color-2));

  &:hover {
    color: var(--color-accent);
  }

  &:focus {
    //outline: 1px solid var(--color-accent);
    color: var(--color-accent);
  }
}

.img {
  border-radius: 100vmax;
  background-color: var(--element-color);
  width: 40px;
  aspect-ratio: 1;

  @include lg {
    width: var(--size-11);
  }
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
