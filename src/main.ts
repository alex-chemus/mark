import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/app/App/App.vue'
import { store, Key } from '@/store'
import routes from '@/routes'
import '@/style/style.scss'

// установить тему
type Theme = 'dark' | 'light'
const prefers = (theme: Theme) =>
  window.matchMedia(`(prefers-color-scheme: ${theme})`).matches
const root = document.querySelector(':root') as HTMLElement

if (prefers('light'))
  root.setAttribute('data-theme', 'light')
else if (prefers('dark'))
  root.setAttribute('data-theme', 'dark')

const key: Key = Symbol()

const router = createRouter({
  routes,
  history: createWebHistory()
})

createApp(App)
  .provide('key', key)
  .use(router)
  .use(store, key)
  .mount('#app');
