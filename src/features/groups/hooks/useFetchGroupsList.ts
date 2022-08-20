import { ref } from 'vue'
import { store } from "@/store"
import { useFetch } from '@/shared'

const useFetchGroupsList = () => {
  const groupsList = ref<number[] | null>(null)

  const fetchGroupsList = async () => {
    if (!store.state.userInfo) return
    const { response } = await useFetch({
      path: 'markMethods/institution.getInfo',
      data: {
        institutionID: store.getters.IID,
        fields: 'groups'
      }
    })
    groupsList.value = response.groups
  }

  return { groupsList, fetchGroupsList }
}

export default useFetchGroupsList
