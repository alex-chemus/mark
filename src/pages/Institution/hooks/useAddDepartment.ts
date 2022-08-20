import { ref } from 'vue'
import { store } from '@/store'
import { useFetch } from '@/shared'

interface IParams {
  facultyID: number
}

const useAddDepartment = () => {
  const departmentName = ref('')

  const addDepartment = async ({ facultyID }: IParams) => {
    if (!store.state.userInfo || departmentName.value === '') return
    await useFetch({
      path: 'markMethods/institution.addDepartment',
      data: {
        institutionID: store.getters.IID,
        facultyID,
        departments: departmentName.value
      }
    })
  }

  return { departmentName, addDepartment }
}

export default useAddDepartment
