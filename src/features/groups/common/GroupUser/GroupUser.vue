<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, inject
} from 'vue'
import { useFetch, IError, User } from '@/shared'
import { Key } from '@/store'
import { useStore } from 'vuex'

const props = defineProps<{
  headStudentID?: number,
  deputyHeadStudentID?: number,
  groupID: number,
  avatar: string,
  fullName: string,
  uid: number,
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const key = inject<Key>('key')
const { commit } = useStore(key)

const opened = ref(false)

const setStatus = async (statusCode: 1 | 2 | 3, userID: number | string) => {
  const { error } = await useFetch({
    path: 'markMethods/group.setUserStatus',
    data: {
      groupID: props.groupID,
      userID,
      status: statusCode
    }
  })

  if (error) {
    commit('setError', error as IError)
    console.log(error)
  } else {
    emit('update')
    opened.value = false
  }
}

const getBadgeText = (id: number | string) => {
  if (props.headStudentID === +id) return 'Староста'
  else if (props.deputyHeadStudentID === +id)
    return 'Зам. старосты'
  return ''
}
</script>

<template>
  <li class="user">
    <user
      :avatar="avatar"
      :full-name="fullName"
      :uid="uid"
      :badge-text="getBadgeText(uid)"
    />

    <button class="more-button" @click="opened = !opened">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-dots-vertical" />
      </svg>
    </button>

    <ul v-show="opened" class="options">
      <li>
        <button class="option-button" @click="setStatus(3, uid)">
          Сделать старостой
        </button>
      </li>
      <li>
        <button class="option-button" @click="setStatus(2, uid)">
          Сделать заместителем старосты
        </button>
      </li>
    </ul>

    <div
      v-if="opened"
      class="backdrop"
      @click="opened = !opened"
      @keydown.esc="opened = !opened"
    />
  </li>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.user {
  transition: var(--fast);
  border-radius: 100vmax;
  outline-color: transparent;
  position: relative;
  @include flex(space-between, center);

  &:hover {
    background-color: var(--bg-color-1);
    outline: 1px solid var(--element-color);

    .more-button {
      display: block;
    }
  }

  @include md {
    &:hover {
      background-color: transparent;
      outline: none;
    }
  }
}

.more-button {
  @include button;
  margin-right: var(--size-6);
  display: none;

  @include md {
    margin-right: 0;
    display: block;
  }
}

.options {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 2;
  list-style: none;
  padding: 0;
  //padding: var(--size-8);
  background-color: var(--bg-color-1);
  border: 1px solid var(--element-color);
  border-radius: var(--size-4);
}

.option-button {
  @include button;
  padding: var(--size-8);
  transition: var(--fast);
  width: 100%;

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  &:not(:last-child) {
    padding-bottom: var(--size-3);
  }

  &:not(:first-child) {
    padding-top: var(--size-3);
  }
}

.backdrop {
  @include backdrop;

  @include md {
    background-color: transparent;
  }
}
</style>
