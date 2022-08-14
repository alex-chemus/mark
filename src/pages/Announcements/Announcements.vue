<script lang="ts" setup>
import { ref } from 'vue'
import { NavItem } from './types'

import SecondaryNav from './SecondaryNav/SecondaryNav.vue'
import Announcement from './Announcement/Announcement.vue'

const section = ref<NavItem>('Портал')
const text = ref(`КТ проходит в форме теста в шаблоне ПГНИУ: test.psu.ru. Открыт с 7 утра до 23 вечера. Время выполнения: 20 минут. Попыток: 1. Вопросы по теме «Сайты». Для сдачи КТ достаточно набрать 50% от 10 вопросов. Логины/пароли в "Материалы для студентов". Для студентов, выбравших практику как форму КТ, задание с инструкцией будет выставлено в папке.`)
</script>

<template>
  <secondary-nav
    :item="section"
    @toggle="value => section = value"
  />
  <main class="announcements">
    <announcement
      teacher="Сарычев Алексей Васильевич"
      date="08.07.2022 23:56"
      :text="text"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '@/style/style.scss';

.announcements {
  margin-bottom: var(--size-15);

  @include md {
    margin-bottom: var(--size-11);
  }
}
</style>
