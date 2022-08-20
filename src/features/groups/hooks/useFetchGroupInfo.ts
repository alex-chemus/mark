import { ref } from 'vue'
import { useFetch } from '@/shared'
import { IGroupInfo } from '../types'

interface IParams {
  currentGroup: number
}

const useFetchGroupInfo = () => {
  const groupInfo = ref<IGroupInfo | null>(null)

  const fetchGroupInfo = async ({ currentGroup }: IParams) => {
    const { response } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs: currentGroup }
    })
    groupInfo.value = response[0] as IGroupInfo
  }

  return { groupInfo, fetchGroupInfo }
}

export default useFetchGroupInfo
