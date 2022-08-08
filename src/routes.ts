const Landing = () => import('@/pages/Landing/Landing.vue')
const Groups = () => import('@/pages/Groups/Groups.vue')
const Group = () => import('@/pages/Group/Group.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
const Announcements = () => import('@/pages/Announcements/Announcements.vue')
const Community = () => import('@/pages/Community/Community.vue')

const routes = [
  { path: '/', component: Landing },
  { path: '/groups', component: Groups },
  { path: '/group/:groupID', component: Group },
  { path: '/cloud', component: Cloud },
  { path: '/announcements', component: Announcements },
  { path: '/community', component: Community }
]

export default routes
