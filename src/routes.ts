const Groups = () => import('@/pages/Groups/Groups.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
const Announcements = () => import('@/pages/Announcements/Announcements.vue')

const routes = [
  { path: '/', component: Groups },
  { path: '/cloud', component: Cloud },
  { path: '/announcements', component: Announcements },
]

export default routes
