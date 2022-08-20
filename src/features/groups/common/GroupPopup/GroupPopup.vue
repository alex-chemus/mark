<script lang="ts" setup>
import {
  defineProps, defineEmits, ref, computed, inject, onMounted
} from 'vue'
import { useStore } from 'vuex'
import { Key } from '@/store'
import { useFetchInstitution } from '@/shared'
import { IGroupInfo } from '@/features/groups/types'
import LeaveWarning from '../LeaveWarning/LeaveWarning.vue'

const key = inject<Key>('key')
const { getters } = useStore(key)

const props = defineProps<{
  opened: boolean,
  groupInfo: IGroupInfo
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const { institutionInfo, fetchInfo } = useFetchInstitution()
onMounted(fetchInfo)

const getName = computed(() => {
  return institutionInfo.value?.shortName
})

const getFaculty = computed(() => {
  const id = props.groupInfo.additionalData.facultyID
  return institutionInfo.value
    ? institutionInfo.value.additionalData.faculties
      .find(f => f.facultyID === id)
    : null
})

const getDepartment = computed(() => {
  const id = props.groupInfo.additionalData.departmentID
  return getFaculty.value
    ? getFaculty.value.departments
      .find(d => d.departmentID === id)
    : null
})

// will fetch data later
/*const institution = ref('*учебное заведение*')
const specialty = ref('*специальность*')
const faculty = ref('*факультет*')*/

const leaving = ref(false)

const userCanShare = computed(() => {
  return getters.roles.includes('teacher')
    || getters.roles.includes('administrator_of_institution')
})

const userCanLeave = computed(() => {
  return !getters.roles.includes('teacher')
    && !getters.roles.includes('administrator_of_institution')
})
</script>

<template>
  <section v-show="opened" class="group-popup">
    <div class="mobile-group">
      <h6>{{ groupInfo.groupName }}</h6>
      <button v-if="userCanShare" class="share-button">
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="~/feather-icons/dist/feather-sprite.svg#share-2" />
        </svg>
      </button>
    </div>

    <dl class="list">
      <dt v-if="getName">{{ getName }}</dt>
      <dd v-if="getName">Учебное учреждение</dd>

      <dt v-if="getFaculty">{{ getFaculty }}</dt>
      <dd v-if="getFaculty">Специальность</dd>

      <dt v-if="getDepartment">{{ getDepartment }}</dt>
      <dd v-if="getDepartment">Факультет</dd>
    </dl>

    <button v-if="userCanLeave" class="logout-btn" @click="leaving = true">
      <svg width="22" height="22" viewBox="0 0 22 22">
        <use href="~/feather-icons/dist/feather-sprite.svg#log-out" />
      </svg>
      <span>Выйти из группы</span>
    </button>
  </section>

  <!-- eslint-disable -->
  <div 
    v-show="opened"
    class="backdrop" 
    @click="emit('toggle')"
  />
  <!-- eslint-enable -->

  <leave-warning
    :is-open="leaving"
    @cancel="leaving = false"
  />
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.group-popup {
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

  @include md {
    @include flex(flex-start, stretch, column);
    @include popup('right');
  }
}

.mobile-group {
  //width: 100%;
  display: none;
  margin-left: var(--size-10);
  margin-right: var(--size-10);
  padding: var(--size-10) 0;
  border-bottom: 1px solid var(--element-color);

  @include md {
    @include flex(space-between, center);
  }

  h6 {
    margin: 0;
    padding: 0;
    font-family: var(--ff-open-sans);
    font-size: var(--size-6);
    color: var(--text-color-1);
  }
}

.share-button {
  @include button(var(--text-color-2));

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.list {
  padding: 0;
  margin: 0;
  list-style: none;
  padding: var(--size-10);
  @include flex(flex-start, flex-start, column);
  //@include gap(var(--size-9), 'column');
}

dt {
  margin-bottom: var(--size-3);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
}

dd {
  margin-top: 0;
  font-family: var(--ff-roboto);
  font-size: var(--size-4);
  color: var(--text-color-2);

  &:not(:last-child) {
    margin-bottom: var(--size-9);
  }
}

.logout-btn {
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--text-color-2);
  @include flex;
  @include gap(var(--size-2));
  padding: var(--size-1) var(--size-10);
  color: var(--bg-color-1);
  background-color: var(--text-color-2);
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  transition: var(--fast);
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-accent);
  }

  @include md {
    margin-top: auto;
  }
}

.backdrop {
  @include backdrop(1);
}
</style>
