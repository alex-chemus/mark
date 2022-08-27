const Groups = () => import('@/pages/Groups/Groups.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
//const Announcements = () => import('@/pages/Announcements/Announcements.vue')
const Institution = () => import('@/pages/Institution/Institution.vue')
const NotFound = () => import('@/pages/NotFound/NotFound.vue')
const Works = () => import('@/pages/Works/Works.vue')
const Invitation = () => import('@/pages/Invitation/Invitation.vue')

const routes = [
  { path: '/', component: Groups },
  { path: '/cloud', component: Cloud },
  { path: '/announcements', component: Works },
  { path: '/institution', component: Institution },
  { path: '/invitation/:id', component: Invitation },
  { path: '/profile', component: Works },
  { path: '/friends', component: Works },
  { path: '/support', component: Works },
  { path: '/settings', component: Works },
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/works', component: Works }
]

export default routes
