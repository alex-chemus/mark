import { ref } from 'vue'
import { useFetch, IError } from '@/shared'
import { store } from '@/store'
import { IReportInfo } from '@/features/reports'

interface IParams {
  groupID?: number,
  userID?: number
}

const useReports = () => {
  const fetchFrom = ref(0)
  const isOver = ref(false)

  const reportsInfo = ref<IReportInfo[] | null>(null)

  const fetchReports = async ({ groupID, userID }: IParams) => {
    if (!groupID && !userID) return
    if (isOver.value) return

    const getData = () => {
      if (groupID) {
        return {
          groupID,
          limit: `${fetchFrom.value},20`
        }
      }
      if (userID) {
        return {
          sendedTo: userID,
          limit: `${fetchFrom.value},20`
        }
      }
      return {}
    }

    const { response, error } = await useFetch({
      path: 'markMethods/attendance.getAttendanceReportsInfo',
      data: getData()
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      if (!reportsInfo.value && response.length === 0) {
        reportsInfo.value === response
        isOver.value = true
      } else if (response.length === 0) {
        isOver.value = true
        return
      }

      reportsInfo.value = reportsInfo.value
        ? [...reportsInfo.value, ...response as IReportInfo[]]
        : response as IReportInfo[]
      fetchFrom.value += 20
    }
  }

  return { fetchReports, reportsInfo }
}

export default useReports
