import { ref } from 'vue'
import { useFetch } from '@/shared'
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
      useFetch({
        path: 'markMethods/group.transferToInstitution',
        data: {
          groupID: response,
          institutionID: store.getters.IID,
          leaveGroup: 0
        }
      })
    }
  }

  return {
    name, hasRoles, createGroup, shouldAttach
  }
}

export default useCreateGroup
