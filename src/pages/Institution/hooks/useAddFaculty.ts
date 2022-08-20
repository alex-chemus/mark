import { ref } from 'vue'
import { store } from '@/store'
import { useFetch } from '@/shared'

const useAddFaculty = () => {
  const facultyName = ref('')

  const addFaculty = async () => {
    if (!store.state.userInfo || facultyName.value === '') return
    await useFetch({
      path: 'markMethods/institution.addFaculty',
      data: {
        institutionID: store.getters.IID,
        faculties: facultyName.value
      }
    })
  }

  return { facultyName, addFaculty }
}

export default useAddFaculty
