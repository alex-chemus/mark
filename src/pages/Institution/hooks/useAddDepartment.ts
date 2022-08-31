import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

interface IParams {
  facultyID: number
}

const useAddDepartment = () => {
  const departmentName = ref('')

  const addDepartment = async ({ facultyID }: IParams) => {
    if (!store.state.userInfo || departmentName.value === '') return
    const { error } = await useFetch({
      path: 'markMethods/institution.addDepartment',
      data: {
        institutionID: store.getters.IID,
        facultyID,
        departments: departmentName.value
      }
    })
    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    }
  }

  return { departmentName, addDepartment }
}

export default useAddDepartment
