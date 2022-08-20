import { ref } from 'vue'
import { useFetch } from '@/shared'
import { store } from '@/store'

const useCreateGroup = () => {
  const name = ref('')
  const hasRoles = ref(false)

  const createGroup = async () => {
    if (!store.state.userInfo) return
    const response = await useFetch({
      path: 'markMethods/group.create',
      data: {
        groupName: name.value,
        enableRoles: hasRoles.value
      }
    })
    console.log('new groupID: ', response)
  }

  return { name, hasRoles, createGroup }
}

export default useCreateGroup
