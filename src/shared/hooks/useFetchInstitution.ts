import { ref } from 'vue'
import { store } from '@/store'
import useFetch from './useFetch'
import { IInstitution } from "../types"

const useFetchInstitution = () => {
  const institutionInfo = ref<IInstitution | null>(null)

  const fetchInfo = async () => {
    if (!store.state.userInfo) return
    const { response } = await useFetch({
      path: 'markMethods/institution.getInfo',
      data: {
        institutionID: store.getters.IID
      }
    })
    institutionInfo.value = response
    return response as IInstitution // eslint-disable-line
  }

  return { institutionInfo, fetchInfo }
}

export default useFetchInstitution
