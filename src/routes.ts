const Groups = () => import('@/pages/Groups/Groups.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
const OurCloud = () => import('@/pages/OurCloud/OurCloud.vue')
//const Announcements = () => import('@/pages/Announcements/Announcements.vue')
const Institution = () => import('@/pages/Institution/Institution.vue')
const NotFound = () => import('@/pages/NotFound/NotFound.vue')
const Works = () => import('@/pages/Works/Works.vue')
const Invitation = () => import('@/pages/Invitation/Invitation.vue')
const Auth = () => import('@/pages/Auth/Auth.vue')

const routes = [
  { path: '/', component: Groups },
  { path: '/groupID/:groupID', component: Groups },
  { path: '/cloud', component: Cloud },
  { path: '/cloud/groups/:groupID/:folderID', component: OurCloud },
  { path: '/cloud/groups/:groupID', component: OurCloud },
  { path: '/cloud/groups', component: OurCloud },
  { path: '/cloud/private', component: Works },
  { path: '/announcements', component: Works },
  { path: '/institution', component: Institution },
  { path: '/invitation/:id', component: Invitation },
  { path: '/profile', component: Works },
  { path: '/friends', component: Works },
  { path: '/support', component: Works },
  { path: '/settings', component: Works },
  { path: '/works', component: Works },
  { path: '/auth', component: Auth },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes
