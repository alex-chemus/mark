import { ref } from 'vue'
import { store } from "@/store"
import { IError, useFetch } from "@/shared"

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
    usersIDs?: number[]
  }

  const reportID = ref<string | null>(null)

  const createReport = async (groupID: number) => {
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
  }

  const createAndSendReport = async ({ groupID, usersIDs }: IParams) => {
    await createReport(groupID)
    if (reportID.value) {
      if (!usersIDs && store.getters.roles.includes('teacher')) {
        if (store.state.userInfo?.id)
          usersIDs = [store.state.userInfo.id] // eslint-disable-line
      }

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
      }
    }
  }

  return { createAndSendReport }
}

export default useCreateReport
