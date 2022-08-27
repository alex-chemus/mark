import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'
import { IGroupInfo } from '../types'

interface IParams {
  currentGroup: number
}

const useFetchGroupInfo = () => {
  const groupInfo = ref<IGroupInfo | null>(null)

  const fetchGroupInfo = async ({ currentGroup }: IParams) => {
    const { response, error } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs: currentGroup }
    })
    //groupInfo.value = response[0] as IGroupInfo
    if (error) {
      store.commit('setError', error as IError)
      console.log(error)
    } else {
      //console.log(response[0])
      groupInfo.value = response[0] as IGroupInfo
      //console.log(groupInfo.value)
    }
  }

  return { groupInfo, fetchGroupInfo }
}

export default useFetchGroupInfo
