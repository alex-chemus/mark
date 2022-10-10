import { ref } from 'vue'
import { store } from "@/store"
import { IError, useFetch } from "@/shared"
import { IResponseAttendance } from '@/features/reports'
import useSaveReport from './useSaveReport'

/* eslint-disable */
function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
/* eslint-enable */

const useCreateReport = () => {
  interface IParams {
    groupID: number,
    usersIDs?: number[],
    attendance: IResponseAttendance[]
  }

  const reportID = ref<string | null>(null)
  const createAndSaveCount = ref(0)
  const notSelectedCounter = ref(0)

  const createReport = async (groupID: number, usersIDs: number[] | undefined) => {
    /* eslint-disable */
    if (store.getters.roles.includes('teacher')) {
      if (store.state.userInfo?.id)
        usersIDs = [store.state.userInfo.id]
    } else {
      if (!usersIDs || !usersIDs.length) {
        notSelectedCounter.value += 1
        return 'not selected'
      }
    }
    /* eslint-enable */

    const { response, error } = await useFetch({
      path: 'markMethods/attendance.createAttendanceReport',
      data: {
        groupID, hash: makeid(30)
      }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      reportID.value = response
    }
    return undefined
  }

  const { saveReport } = useSaveReport()

  const createAndSendReport = async ({ groupID, usersIDs, attendance }: IParams) => {
    await saveReport({ groupID, attendance })
    const notSelected = await createReport(groupID, usersIDs)

    if (store.getters.roles.includes('teacher')) {
      if (store.state.userInfo?.id)
        usersIDs = [store.state.userInfo.id] // eslint-disable-line
    }

    if (reportID.value && !notSelected) {
      const { error } = await useFetch({
        path: 'markMethods/attendance.sendAttendanceReport',
        data: {
          reportID: reportID.value,
          hash: makeid(30),
          usersIDs
        }
      })

      if (error) {
        console.log(error)
        store.dispatch(error)
      } else {
        createAndSaveCount.value += 1
      }
    }
  }

  return { createAndSendReport, createAndSaveCount, notSelectedCounter }
}

export default useCreateReport
