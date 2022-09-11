import { ref } from 'vue'
import { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import { store } from '@/store'

interface IParams {
  router: Router,
  route: RouteLocationNormalizedLoaded
}

const useValidation = ({ router, route }: IParams) => {
  const isValid = ref(false)

  const pushToStartingRoute = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
    ) return

    const isHeadStudent = store.state.userInfo.institutionData.groupStatus === 'head_student'
    const isDeputyStudent = store.state.userInfo.institutionData.groupStatus === 'deputy_head_student'
    if (isHeadStudent || isDeputyStudent) {
      if (store.state.userInfo.additionalData.inGroups[0])
        router.push({ path: `/new-report/${store.state.userInfo.additionalData.inGroups[0]}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    const isTeacher = store.getters.roles.includes('teacher')
    if (isTeacher) {
      if (store.state.userInfo.additionalData.inGroups.length)
        router.push({ path: `/new-report/${store.state.userInfo.additionalData.inGroups[0]}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    if (!store.state.institution) return
    const isAdminUU = store.getters.roles.includes('administrator_of_institution')
    if (isAdminUU) {
      if (store.state.institution.groups[0])
        router.push({ path: `/new-report/${store.state.institution.groups[0]}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    router.push({ path: '/notfound' })
  }

  const validate = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
      || !route.path.startsWith('/new-report')
    ) return

    if (!route.params.groupID) {
      console.log('push to starting route')
      pushToStartingRoute()
      return
    }

    const isHeadStudent = store.state.userInfo.institutionData.groupStatus === 'head_student'
    const isDeputyStudent = store.state.userInfo.institutionData.groupStatus === 'deputy_head_student'
    if (isHeadStudent || isDeputyStudent) {
      const isExactGroup = store.state.userInfo.additionalData.inGroups[0] === +(route.params.groupID as string)
      if (!isExactGroup) pushToStartingRoute()
      else {
        isValid.value = true
        return
      }
    }

    const isTeacher = store.getters.roles.includes('teacher')
    if (isTeacher) {
      const hasGroup = [
        ...store.state.userInfo.additionalData.inGroups,
        ...store.state.userInfo.additionalData.ownGroups
      ].includes(+(route.params.groupID as string))
      if (!hasGroup) pushToStartingRoute()
      else {
        isValid.value = true
        return
      }
    }

    if (!store.state.institution) return
    const isAdminUU = store.getters.roles.includes('administrator_of_institution')
    if (isAdminUU) {
      const hasGroup = store.state.institution.groups.includes(+(route.params.groupID as string))
      if (!hasGroup) pushToStartingRoute()
      else {
        isValid.value = true
        return
      }
    }

    // regular student
    router.push({ path: '/notfound' })
  }

  const validationDeps = [
    () => store.getters.roles,
    () => store.state.userInfo,
    () => store.state.institution,
    () => route.params.groupID
  ]

  return { isValid, validate, validationDeps }
}

export default useValidation
