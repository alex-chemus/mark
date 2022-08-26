import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

const useAddFaculty = () => {
  const facultyName = ref('')

  const addFaculty = async () => {
    if (!store.state.userInfo || facultyName.value === '') return
    const { error } = await useFetch({
      path: 'markMethods/institution.addFaculty',
      data: {
        institutionID: store.getters.IID,
        faculties: facultyName.value
      }
    })

    if (error)
      store.commit('setError', error as IError)
  }

  return { facultyName, addFaculty }
}

export default useAddFaculty
