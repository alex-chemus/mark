<script lang="ts" setup>
import {
  onBeforeMount, onMounted, watch, computed, ref
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useValidation from './hooks/useValidation'
import useReports from './hooks/useReports'
import useSortedReports from './hooks/useSortedReports'

const router = useRouter()
const route = useRoute()

// watch for router.options.history.state.back

const { validate, isValid, validationDeps } = useValidation({ route, router })
onBeforeMount(validate)
watch(validationDeps, validate)

const { fetchReports, reportsInfo } = useReports()
const getReports = () => {
  if (!isValid.value) return
  if (route.params.groupID) {
    fetchReports({
      groupID: +(route.params.groupID as string)
    })
  } else {
    fetchReports({
      userID: +(route.params.userID as string)
    })
  }
}
onMounted(getReports)
watch([
  isValid,
  () => route.params.groupID,
  () => route.params.userID
], getReports)

const { sort, sortedReports } = useSortedReports({ reportsInfo })
</script>

<template>
  <nav>
    <div class="sort-group">
      <svg class="sort-icon" width="24" height="24" viewBox="0 0 24 24">
        <use href="@/assets/tabler-sprite.svg#tabler-arrows-sort" />
      </svg>
      <button class="sort-button" :class="sort === 'latest' ? 'selected' : ''" @click="sort = 'latest'">
        Сначала новые
      </button>
      <button class="sort-button" :class="sort === 'oldest' ? 'selected' : ''" @click="sort = 'oldest'">
        Сначала старые
      </button>
    </div>
  </nav>
  <div v-if="sortedReports && sortedReports.length === 0" class="no-reports">
    У вас нет отчетов
  </div>
  <ul v-else-if="sortedReports" class="reports-list">
    <li v-for="(report, i) in sortedReports" :key="i">
      <router-link :to="`/report/${report.textID}`">
        <div>
          <span>{{ report.date }}</span>
          <span>{{ report.groupName }}</span>
          <span>{{report.institutionData.shortName }}</span>
        </div>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <use href="@/assets/tabler-sprite.svg#tabler-chevron-right" />
        </svg>
      </router-link>
    </li>
    <button @click="getReports" class="load-button">Далее</button>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.no-reports {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-family: var(--ff-montserrat);
  font-size: var(--size-8);
  color: var(--text-color-1);
  text-align: center;

  @include md {
    font-size: var(--size-6);
  }
}

nav {
  @include container;
  //margin: var(--size-12) 0 var(--size-15);
  margin-top: var(--size-12);
  margin-bottom: var(--size-15);
  border-bottom: 1px solid var(--element-color);

  @include md {
    //margin: var(--size-9) 0 var(--size-11);
    margin-top: var(--size-9);
    margin-bottom: var(--size-11);
  }
}

.sort-group {
  @include flex(flex-start, flex-end);
  @include gap(var(--size-9));

  @include md {
    @include gap(var(--size-8));
  }
}

.sort-icon {
  margin-bottom: 9px;
  color: var(--text-color-2);

  @include md {
    display: none;
  }
}

.sort-button {
  @include button;
  padding-bottom: var(--size-3);
  transition: var(--fast);

  &:first-of-type {
    @include md {
      margin-left: 0;
    }
  }

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
}

.sort-button.selected {
  color: var(--color-accent);
  position: relative;
  &::after {
    @include underline;
  }
}

.reports-list {
  @include small-container;
  @include gap(var(--size-11), 'column');
  list-style: none;
  padding: 0;
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
    @include gap(var(--size-10), 'column');
  }
}

li {
  padding-bottom: var(--size-1);
  border-bottom: 1px solid var(--element-color);
  transition: var(--fast);
}

li a {
  font-family: var(--ff-open-sans);
  font-size: var(--size-6);
  color: var(--text-color-1);
  text-decoration: none;
  display: block;
  transition: var(--fast);
  flex-grow: 2;
  @include flex(space-between, center);

  &:hover,
  &:focus {
    color: var(--color-accent);
  }

  @include md {
    font-size: var(--size-5);
  }

  svg {
    flex-shrink: 0;
  }

  div {
    & > *:not(:last-child) {
      margin-right: var(--size-2);
    }
    @include flex;
    flex-wrap: wrap;

    span {
      white-space: nowrap;
    }
  }
}

.load-button {
  @include button-hollow;
}
</style>
