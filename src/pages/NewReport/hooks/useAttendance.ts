import { Ref, ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { IResponseAttendance } from '@/features/reports'
import { useFetch, IError } from '@/shared'
import { store } from '@/store'

interface IParams {
  route: RouteLocationNormalizedLoaded
}

const useAttendance = ({ route }: IParams) => {
  const attendance = ref<IResponseAttendance[] | null>(null)

  const fetchAttendance = async (isValid: Ref<boolean>) => {
    if (!isValid.value) return
    const { response, error } = await useFetch({
      path: 'markMethods/attendance.getAttendanceListInfo',
      data: {
        groupID: route.params.groupID
      }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      attendance.value = response.students as IResponseAttendance[]
    }
  }

  const updateAttendance = (userID: number) => {
    if (!attendance.value) return
    attendance.value = attendance.value.map(user => {
      if (user.userID === userID)
        return { ...user, isPresent: !user.isPresent }
      else
        return user
    })
  }

  return { attendance, fetchAttendance, updateAttendance }
}

export default useAttendance
