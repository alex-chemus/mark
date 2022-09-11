import { ref, computed, Ref } from 'vue'
import { IReportInfo, useTime } from '@/features/reports'

interface IParams {
  reportsInfo: Ref<IReportInfo[] | null>
}

const useSortedReports = ({ reportsInfo }: IParams) => {
  type Sort = 'latest' | 'oldest'
  const sort = ref<Sort>('latest')

  const sortedReports = computed(() => {
    if (!reportsInfo.value) return null

    const { setTime } = useTime()

    if (sort.value === 'latest')
      return reportsInfo.value.map(r => setTime(r))
    else
      return [...reportsInfo.value].reverse().map(r => setTime(r))
  })

  return { sort, sortedReports }
}

export default useSortedReports
