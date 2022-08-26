import { ref } from 'vue'
import { useFetch, IError } from '@/shared'
import { store } from '@/store'

const useCreateGroup = () => {
  const name = ref('')
  const hasRoles = ref(false)
  const shouldAttach = ref(false)

  const createGroup = async () => {
    if (!store.state.userInfo) return
    const { response } = await useFetch({
      path: 'markMethods/group.create',
      data: {
        groupName: name.value,
        enableRoles: hasRoles.value
      }
    })

    if (shouldAttach.value && store.getters.roles.includes('teacher')) {
      const { error } = await useFetch({
        path: 'markMethods/group.transferToInstitution',
        data: {
          groupID: response,
          institutionID: store.getters.IID,
          leaveGroup: 0
        }
      })
      if (error)
        store.commit('setError', error as IError)
    }
  }

  return {
    name, hasRoles, createGroup, shouldAttach
  }
}

export default useCreateGroup
