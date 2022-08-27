import { ref } from 'vue'
import { store } from '@/store'
import { IError, useFetch } from '@/shared'
import { IInvitationInfo } from '../types'

interface Params {
  invitationID: string
}

const useFetchInvitationInfo = () => {
  const invitationInfo = ref<IInvitationInfo | null>(null)

  const getInvitationInfo = async ({ invitationID }: Params) => {
    const { response, error } = await useFetch({
      path: 'markMethods/group.getInvitationInfo',
      data: { invitationID }
    })

    if (error) {
      store.commit('setError', error as IError)
      console.log(error)
    } else {
      invitationInfo.value = response
    }
  }

  return { invitationInfo, getInvitationInfo }
}

export default useFetchInvitationInfo
