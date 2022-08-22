import { ref } from 'vue'
import { useFetch } from '@/shared'
import { store } from '@/store'
import { IGroupButton } from '../types'

interface IParams {
  groupsIDs: number[]
}

const useFetchGroups = () => {
  const groups = ref<IGroupButton[]>([])

  const fetchGroups = async ({ groupsIDs }: IParams) => {
    if (!store.state.userInfo) return
    const { response } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs }
    })
    groups.value = response.map((group: any) => ({
      groupName: group.groupName,
      groupID: group.groupID
    } as IGroupButton))
  }

  return { groups, fetchGroups }
}


export default useFetchGroups
