const Groups = () => import('@/pages/Groups/Groups.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
const Announcements = () => import('@/pages/Announcements/Announcements.vue')
const Institution = () => import('@/pages/Institution/Institution.vue')
const NotFound = () => import('@/pages/NotFound/NotFound.vue')
const Works = () => import('@/pages/Works/Works.vue')

const routes = [
  { path: '/', component: Groups },
  { path: '/cloud', component: Cloud },
  { path: '/announcements', component: Announcements },
  { path: '/institution', component: Institution },
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/works', component: Works }
]

export default routes
