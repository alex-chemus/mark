import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

const useGroupName = () => {
  const groupName = ref<string | null>(null)
  const headStudentID = ref<number | null>(null)
  const deputyStudentID = ref<number | null>(null)

  interface IParams {
    groupID: number
  }

  const fetchGroupInfo = async ({ groupID }: IParams) => {
    if (!groupID) return
    const { response, error } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs: groupID }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      groupName.value = response[0].groupName as string
      headStudentID.value = response[0].headStudentID as number
      deputyStudentID.value = response[0].deputyHeadStudentID as number
    }
  }

  return {
    groupName, fetchGroupInfo, headStudentID, deputyStudentID
  }
}

export default useGroupName
