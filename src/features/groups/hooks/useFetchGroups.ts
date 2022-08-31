import { ref } from 'vue'
import { useFetch, IError } from '@/shared'
import { store } from '@/store'
import { IGroupButton } from '../types'

interface IParams {
  groupsIDs: number[]
}

const useFetchGroups = () => {
  const groups = ref<IGroupButton[]>([])

  const fetchGroups = async ({ groupsIDs }: IParams) => {
    if (!store.state.userInfo) return
    const { response, error } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs }
    })
    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    } else {
      groups.value = response.map((group: any) => ({
        groupName: group.groupName,
        groupID: group.groupID
      } as IGroupButton))
    }
  }

  return { groups, fetchGroups }
}


export default useFetchGroups
