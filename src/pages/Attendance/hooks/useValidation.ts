/* eslint no-param-reassign: off */
import { store } from '@/store'
import { Ref, ref } from 'vue'
import { Router, RouteLocationNormalizedLoaded } from "vue-router"

interface IParams {
  router: Router,
  route: RouteLocationNormalizedLoaded
}

const useUserValidation = ({ router, route }: IParams, isValid: Ref<boolean>) => {
  const pushToStartingRoute = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
    ) return

    const isTeacher = store.getters.roles.includes('teacher')
    if (isTeacher && store.state.userInfo.id) {
      router.push({ path: `/attendance/user/${store.state.userInfo.id}` })
      return
    }

    if (!store.state.institution) return
    const isAdminUU = store.getters.roles.includes('administrator_of_institution')
    if (isAdminUU) {
      const { teachers } = store.state.institution.additionalData.staff
      if (teachers.length)
        router.push({ path: `/attendance/user/${teachers[0].userID}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    router.push({ path: '/notfound' })
  }

  const validateUser = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
      || !route.path.startsWith('/attendance/user')
    ) return

    if (!route.params.userID) {
      pushToStartingRoute()
      return
    }

    if (store.getters.roles.includes('teacher')) {
      const userID = +(route.params.userID as string)
      if (userID === store.state.userInfo.id) isValid.value = true
      else pushToStartingRoute()
      return
    }

    if (!store.state.institution) return
    const isAdminUU = store.getters.roles.includes('administrator_of_institution')
    if (isAdminUU) {
      const userID = +(route.params.userID as string)
      const { teachers } = store.state.institution.additionalData.staff
      if (teachers.map(t => t.userID).includes(userID)) isValid.value = true
      else pushToStartingRoute()
      return
    }

    router.push({ path: '/notfound' })
  }

  return validateUser
}

const useGroupValidation = ({ router, route }: IParams, isValid: Ref<boolean>) => {
  const pushToStartingRoute = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
    ) return

    const isStudent = !store.getters.roles.includes('teacher')
      && !store.getters.roles.includes('administrator_of_institution')
    if (isStudent) {
      const groups = store.state.userInfo.additionalData.inGroups
      if (groups.length)
        router.push({ path: `/attendance/group/${groups[0]}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    if (!store.state.institution) return
    if (store.getters.roles.includes('administrator_of_institution')) {
      const { groups } = store.state.institution
      if (groups.length)
        router.push({ path: `/attendance/group/${groups[0]}` })
      else
        router.push({ path: '/notfound' })
      return
    }

    router.push({ path: '/notfound' })
  }

  const validateGroup = () => {
    if (
      !store.getters.roles
      || !store.state.userInfo
      //|| !store.state.institution
      || !route.path.startsWith('/attendance/group')
    ) return

    if (!route.params.groupID) {
      pushToStartingRoute()
      return
    }

    const isStudent = !store.getters.roles.includes('teacher')
      && !store.getters.roles.includes('administrator_of_institution')
    if (isStudent) {
      const group = +(route.params.groupID)
      const groups = store.state.userInfo.additionalData.inGroups
      if (groups.includes(group)) isValid.value = true
      else pushToStartingRoute()
      return
    }

    if (!store.state.institution) return
    if (store.getters.roles.includes('administrator_of_institution')) {
      const group = +(route.params.groupID)
      const { groups } = store.state.institution
      if (groups.includes(group)) isValid.value = true
      else pushToStartingRoute()
      return
    }

    router.push({ path: '/notfound' })
  }

  return validateGroup
}

const useValidation = ({ router, route }: IParams) => {
  const isValid = ref(false)

  const validateUser = useUserValidation({ route, router }, isValid)
  const validateGroup = useGroupValidation({ route, router }, isValid)

  const validate = () => {
    if (route.path.startsWith('/attendance/group')) validateGroup()
    if (route.path.startsWith('/attendance/user')) validateUser()
  }

  const validationDeps = [
    () => store.getters.roles,
    () => store.state.userInfo,
    () => store.state.institution,
    () => route.params.groupID,
    () => route.params.userID
  ]

  return { validate, isValid, validationDeps }
}

export default useValidation
