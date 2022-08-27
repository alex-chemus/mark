import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

interface IParams {
  groupID: number,
  url: string
}

const useShareGroup = () => {
  //const invitationID = ref<string | null>(null)
  const invitationLink = ref<string | null>(null)
  const message = ref<string>('')

  const shareGroup = async ({ groupID, url }: IParams) => {
    const { response, error } = await useFetch({
      path: 'markMethods/group.createInvitation',
      data: { groupID }
    })
    if (error) {
      store.commit('setError', error as IError)
      console.log(error)
      return null
    } else {
      //invitationID.value = response as string
      invitationLink.value = `${url}/invitation/${response as string}`
      navigator.clipboard.writeText(invitationLink.value)
      //message.value = `InvitationID скопировано! ${invitationID.value}`
      message.value = 'Ссылка скопирована!'
      return invitationLink.value
    }
  }

  return { shareGroup, message, invitationLink }
}

export default useShareGroup
