import { useFetch, IError } from "@/shared"
import { store } from "@/store"
import { IResponseAttendance } from "@/features/reports"

const useSaveReport = () => {
  const markAttendance = async (present: IResponseAttendance[], groupID: number) => {
    const usersIDs = present.map(s => s.userID)
    if (!usersIDs.length) return

    const { error } = await useFetch({
      path: 'markMethods/attendance.markUserAttendance',
      data: { groupID, usersIDs }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    }
  }

  const removeAttendance = async (missing: IResponseAttendance[], groupID: number) => {
    const usersIDs = missing.map(s => s.userID)
    if (!usersIDs.length) return

    const { error } = await useFetch({
      path: 'markMethods/attendance.removeUserAttendance',
      data: { groupID, usersIDs }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    }
  }

  interface IParams {
    attendance: IResponseAttendance[],
    groupID: number
  }

  const saveReport = async ({ attendance, groupID }: IParams) => {
    await markAttendance(attendance.filter(s => s.isPresent), groupID)
    await removeAttendance(attendance.filter(s => !s.isPresent), groupID)
  }

  return { saveReport }
}

export default useSaveReport
