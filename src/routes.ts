const Groups = () => import('@/pages/Groups/Groups.vue')
const Cloud = () => import('@/pages/Cloud/Cloud.vue')
const OurCloud = () => import('@/pages/OurCloud/OurCloud.vue')
const MyCloud = () => import('@/pages/MyCloud/MyCloud.vue')
//const Announcements = () => import('@/pages/Announcements/Announcements.vue')
const Institution = () => import('@/pages/Institution/Institution.vue')
const NotFound = () => import('@/pages/NotFound/NotFound.vue')
const Works = () => import('@/pages/Works/Works.vue')
const Invitation = () => import('@/pages/Invitation/Invitation.vue')
const Auth = () => import('@/pages/Auth/Auth.vue')
const NewReport = () => import('@/pages/NewReport/NewReport.vue')
const Attendance = () => import('@/pages/Attendance/Attendance.vue')
const Report = () => import('@/pages/Report/Report.vue')
const EditReport = () => import('@/pages/EditReport/EditReport.vue')

const routes = [
  { path: '/', component: Groups },
  { path: '/groupID/:groupID', component: Groups },
  { path: '/cloud', component: Cloud },
  { path: '/cloud/groups/:groupID/:folderID', component: OurCloud },
  { path: '/cloud/groups/:groupID', component: OurCloud },
  { path: '/cloud/groups', component: OurCloud },
  { path: '/cloud/private', component: MyCloud },
  { path: '/announcements', component: Works },
  { path: '/institution', component: Institution },
  { path: '/invitation/:id', component: Invitation },
  { path: '/profile', component: Works },
  { path: '/friends', component: Works },
  { path: '/support', component: Works },
  { path: '/settings', component: Works },
  { path: '/works', component: Works },
  { path: '/auth', component: Auth },
  { path: '/auth/:id', component: Auth },
  { path: '/new-report/:groupID', component: NewReport },
  { path: '/new-report', component: NewReport },
  { path: '/attendance/group/:groupID', component: Attendance },
  { path: '/attendance/group', component: Attendance },
  { path: '/attendance/user/:userID', component: Attendance },
  { path: '/attendance/user', component: Attendance },
  { path: '/report/:reportID', component: Report },
  { path: '/edit-report/:reportID', component: EditReport },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes
