<script lang="ts" setup>
import { inject, ref } from 'vue'
import { Key } from '@/store'
import { useStore } from 'vuex'
import { useFetch } from '@/shared';

const key = inject<Key>('key')
const { dispatch } = useStore(key)

const invitationID = ref('')
const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  invitationID.value = target.value
}

const joinGroup = async () => {
  await useFetch({
    path: 'markMethods/group.join',
    data: { invitationID: invitationID.value }
  })
  dispatch('fetchUserInfo')
}
</script>

<template>
  <form @submit.prevent>
    <label for="invite">
      <span class="text">Введите InvitationID</span>
      <div class="wrapper">
        <input
          id="invite"
          type="text"
          class="input"
          :value="invitationID"
          @input="onInput"
          placeholder="InvitationID"
        />
        <button class="button" @click="joinGroup">Войти</button>
      </div>
    </label>
  </form>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  width: calc(100vw - 2rem);
}

label {
  @include flex(center, center, column);
}

.text {
  display: block;
  margin-bottom: var(--size-5);
  text-align: center;
  //font-family: var(--ff-open-sans);
  //font-size: var(--size-6);
  //color: var(--text-color-2);
  font-family: var(--ff-montserrat);
  font-size: var(--size-7);
  color: var(--text-color-1);

  @include md {
    font-size: var(--size-6);
  }
}

.wrapper {
  width: 100%;
  @include flex;
  @include gap(var(--size-3));

  @include sm {
    flex-direction: column;
    align-items: stretch;
    @include gap(var(--size-3), 'column');
  }}

input {
  @include input;
}

button {
  @include button-fill;
}
</style>
