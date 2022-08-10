<script lang="ts" setup>
// eslint-disable-next-line
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const logout = () => {} // eslint-disable-line

const openClass = computed(() => {
  return props.opened ? 'opened' : ''
})
</script>

<template>
    <section v-show="opened" class="popup" :class="openClass">
      <ul class="list">
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.3333 19.25V17.4167C18.3333 16.4442 17.947 15.5116 17.2594 14.8239C16.5717 14.1363 15.6391 13.75 14.6666 13.75H7.33329C6.36083 13.75 5.4282 14.1363 4.74057 14.8239C4.05293 15.5116 3.66663 16.4442 3.66663 17.4167V19.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 10.0833C13.0251 10.0833 14.6667 8.44171 14.6667 6.41667C14.6667 4.39162 13.0251 2.75 11 2.75C8.975 2.75 7.33337 4.39162 7.33337 6.41667C7.33337 8.44171 8.975 10.0833 11 10.0833Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Профиль</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_36_1091)">
              <path d="M15.5833 19.25V17.4167C15.5833 16.4442 15.197 15.5116 14.5094 14.8239C13.8217 14.1363 12.8891 13.75 11.9166 13.75H4.58329C3.61083 13.75 2.6782 14.1363 1.99057 14.8239C1.30293 15.5116 0.916626 16.4442 0.916626 17.4167V19.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.25004 10.0833C10.2751 10.0833 11.9167 8.44171 11.9167 6.41667C11.9167 4.39162 10.2751 2.75 8.25004 2.75C6.225 2.75 4.58337 4.39162 4.58337 6.41667C4.58337 8.44171 6.225 10.0833 8.25004 10.0833Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21.0834 19.25V17.4167C21.0828 16.6042 20.8124 15.815 20.3146 15.173C19.8169 14.5309 19.12 14.0723 18.3334 13.8692" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.6666 2.86916C15.4553 3.07111 16.1544 3.52981 16.6536 4.17295C17.1528 4.81609 17.4238 5.60709 17.4238 6.42125C17.4238 7.2354 17.1528 8.0264 16.6536 8.66955C16.1544 9.31269 15.4553 9.77139 14.6666 9.97333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_36_1091">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            <span>Друзья</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 20.1667C16.0627 20.1667 20.1667 16.0626 20.1667 11C20.1667 5.93739 16.0627 1.83334 11 1.83334C5.93743 1.83334 1.83337 5.93739 1.83337 11C1.83337 16.0626 5.93743 20.1667 11 20.1667Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 7.33333V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 14.6667H11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Подержка</span>
          </router-link>
        </li>
        <li>
          <router-link to="/group">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_36_1096)">
              <path d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.7833 13.75C17.6613 14.0265 17.6249 14.3332 17.6788 14.6305C17.7327 14.9279 17.8745 15.2023 18.0858 15.4183L18.1408 15.4733C18.3112 15.6436 18.4465 15.8458 18.5387 16.0684C18.631 16.2909 18.6785 16.5295 18.6785 16.7704C18.6785 17.0113 18.631 17.2499 18.5387 17.4725C18.4465 17.695 18.3112 17.8972 18.1408 18.0675C17.9705 18.238 17.7683 18.3732 17.5458 18.4654C17.3232 18.5577 17.0846 18.6052 16.8437 18.6052C16.6028 18.6052 16.3642 18.5577 16.1417 18.4654C15.9191 18.3732 15.7169 18.238 15.5466 18.0675L15.4916 18.0125C15.2756 17.8012 15.0012 17.6594 14.7038 17.6055C14.4065 17.5516 14.0998 17.588 13.8233 17.71C13.5522 17.8262 13.3209 18.0191 13.1581 18.2651C12.9952 18.511 12.9078 18.7992 12.9066 19.0942V19.25C12.9066 19.7362 12.7135 20.2025 12.3697 20.5464C12.0258 20.8902 11.5595 21.0833 11.0733 21.0833C10.5871 21.0833 10.1207 20.8902 9.77693 20.5464C9.43311 20.2025 9.23996 19.7362 9.23996 19.25V19.1675C9.23286 18.8641 9.13465 18.5698 8.95809 18.323C8.78154 18.0761 8.5348 17.8881 8.24996 17.7833C7.97348 17.6613 7.66678 17.6249 7.36942 17.6788C7.07206 17.7327 6.79766 17.8745 6.58163 18.0858L6.52663 18.1408C6.35636 18.3113 6.15416 18.4465 5.9316 18.5388C5.70904 18.631 5.47047 18.6785 5.22954 18.6785C4.98861 18.6785 4.75005 18.631 4.52749 18.5388C4.30492 18.4465 4.10273 18.3113 3.93246 18.1408C3.762 17.9706 3.62678 17.7684 3.53452 17.5458C3.44226 17.3232 3.39477 17.0847 3.39477 16.8437C3.39477 16.6028 3.44226 16.3643 3.53452 16.1417C3.62678 15.9191 3.762 15.7169 3.93246 15.5467L3.98746 15.4917C4.19878 15.2756 4.34055 15.0012 4.39446 14.7039C4.44838 14.4065 4.41198 14.0998 4.28996 13.8233C4.17376 13.5522 3.98082 13.321 3.73489 13.1581C3.48895 12.9952 3.20076 12.9078 2.90579 12.9067H2.74996C2.26373 12.9067 1.79741 12.7135 1.4536 12.3697C1.10978 12.0259 0.916626 11.5596 0.916626 11.0733C0.916626 10.5871 1.10978 10.1208 1.4536 9.77697C1.79741 9.43315 2.26373 9.24 2.74996 9.24H2.83246C3.13587 9.2329 3.43013 9.13469 3.67698 8.95813C3.92384 8.78158 4.11187 8.53484 4.21663 8.25C4.33865 7.97352 4.37505 7.66682 4.32113 7.36946C4.26721 7.0721 4.12545 6.7977 3.91413 6.58167L3.85913 6.52667C3.68867 6.3564 3.55344 6.1542 3.46118 5.93164C3.36892 5.70908 3.32143 5.47051 3.32143 5.22958C3.32143 4.98865 3.36892 4.75009 3.46118 4.52753C3.55344 4.30496 3.68867 4.10277 3.85913 3.9325C4.02939 3.76204 4.23159 3.62682 4.45415 3.53456C4.67672 3.4423 4.91528 3.39481 5.15621 3.39481C5.39714 3.39481 5.6357 3.4423 5.85827 3.53456C6.08083 3.62682 6.28303 3.76204 6.45329 3.9325L6.50829 3.9875C6.72433 4.19882 6.99872 4.34059 7.29609 4.3945C7.59345 4.44842 7.90014 4.41202 8.17663 4.29H8.24996C8.52108 4.1738 8.75231 3.98086 8.91518 3.73493C9.07805 3.48899 9.16545 3.2008 9.16663 2.90583V2.75C9.16663 2.26377 9.35978 1.79745 9.7036 1.45364C10.0474 1.10982 10.5137 0.916666 11 0.916666C11.4862 0.916666 11.9525 1.10982 12.2963 1.45364C12.6401 1.79745 12.8333 2.26377 12.8333 2.75V2.8325C12.8345 3.12747 12.9219 3.41566 13.0847 3.66159C13.2476 3.90753 13.4788 4.10047 13.75 4.21667C14.0264 4.33869 14.3331 4.37509 14.6305 4.32117C14.9279 4.26725 15.2023 4.12549 15.4183 3.91417L15.4733 3.85917C15.6436 3.68871 15.8458 3.55348 16.0683 3.46122C16.2909 3.36896 16.5294 3.32147 16.7704 3.32147C17.0113 3.32147 17.2499 3.36896 17.4724 3.46122C17.695 3.55348 17.8972 3.68871 18.0675 3.85917C18.2379 4.02943 18.3731 4.23163 18.4654 4.45419C18.5577 4.67676 18.6052 4.91532 18.6052 5.15625C18.6052 5.39718 18.5577 5.63574 18.4654 5.85831C18.3731 6.08087 18.2379 6.28307 18.0675 6.45333L18.0125 6.50833C17.8011 6.72437 17.6594 6.99876 17.6055 7.29613C17.5515 7.59349 17.5879 7.90018 17.71 8.17667V8.25C17.8262 8.52112 18.0191 8.75235 18.265 8.91522C18.511 9.07809 18.7992 9.16549 19.0941 9.16667H19.25C19.7362 9.16667 20.2025 9.35982 20.5463 9.70364C20.8901 10.0475 21.0833 10.5138 21.0833 11C21.0833 11.4862 20.8901 11.9525 20.5463 12.2964C20.2025 12.6402 19.7362 12.8333 19.25 12.8333H19.1675C18.8725 12.8345 18.5843 12.9219 18.3384 13.0848C18.0924 13.2476 17.8995 13.4789 17.7833 13.75V13.75Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_36_1096">
              <rect width="22" height="22" fill="white"/>
              </clipPath>
              </defs>
            </svg>
            <span>Настройки</span>
          </router-link>
        </li>
      </ul>

      <button class="logout-btn" @click="logout">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.25 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V4.58333C2.75 4.0971 2.94315 3.63079 3.28697 3.28697C3.63079 2.94315 4.0971 2.75 4.58333 2.75H8.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.6666 15.5833L19.25 11L14.6666 6.41667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.25 11H8.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Выйти из аккаунта</span>
      </button>
    </section>

    <!-- eslint-disable -->
    <div 
      v-show="opened"
      class="backdrop" 
      :class="openClass"
      @click="emit('toggle')"
    />
    <!-- eslint-enable -->
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.popup {
  display: none;
  //width: max(300px, fit-content);
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

  &.opened {
    display: block
  }
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: var(--size-9);
  @include flex(flex-start, flex-start, column);
  @include gap(var(--size-8), 'column');
}

li {
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
  color: var(--text-color-1);
  //transition: var(--fast);
  outline: none;

  &:hover {
    color: var(--color-accent);
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: var(--fast);
    outline: none;
    @include flex;
    @include gap(var(--size-2));

    &:focus {
      color: var(--color-accent)
    }
  }
}

.logout-btn {
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-1) var(--size-9);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-5);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }
}

.backdrop {
  display: none;
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  cursor: pointer;
  //background-color: rgba(0 0 0 / .15);

  &.opened {
    display: block;
  }
}
</style>
