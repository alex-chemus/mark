import { ref } from 'vue'
import { useFetch } from '@/shared'

interface IParams {
  groupID: number
}

const useShareGroup = () => {
  const invitationID = ref<string | null>(null)
  const message = ref<string>('')

  const shareGroup = async ({ groupID }: IParams) => {
    const { response } = await useFetch({
      path: 'markMethods/group.createInvitation',
      data: { groupID }
    })
    invitationID.value = response as string
    navigator.clipboard.writeText(invitationID.value)
    message.value = `InvitationID скопировано! ${invitationID.value}`
    return invitationID.value
  }

  return { shareGroup, message, invitationID }
}

export default useShareGroup
