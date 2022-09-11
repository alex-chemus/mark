import { ref } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'
import { IReportInfo, useTime } from '@/features/reports'

interface IParams {
  route: RouteLocationNormalizedLoaded
}

const useReport = ({ route }: IParams) => {
  const report = ref<IReportInfo | null>(null)

  const fetchReport = async () => {
    const { response, error } = await useFetch({
      path: 'markMethods/attendance.getAttendanceReportsInfo',
      data: {
        reportsIDs: route.params.reportID
      }
    })

    const { setTime } = useTime()

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      report.value = setTime(response[0] as IReportInfo)
    }
  }

  return { report, fetchReport }
}

export default useReport
