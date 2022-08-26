import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

interface IParams {
  groupID: number
}

const useShareGroup = () => {
  const invitationID = ref<string | null>(null)
  const message = ref<string>('')

  const shareGroup = async ({ groupID }: IParams) => {
    const { response, error } = await useFetch({
      path: 'markMethods/group.createInvitation',
      data: { groupID }
    })
    if (error) {
      store.commit('setError', error as IError)
      return null
    } else {
      invitationID.value = response as string
      navigator.clipboard.writeText(invitationID.value)
      message.value = `InvitationID скопировано! ${invitationID.value}`
      return invitationID.value
    }
  }

  return { shareGroup, message, invitationID }
}

export default useShareGroup
