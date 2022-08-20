import { ref } from 'vue'
import { store } from '@/store'
import { useFetch } from '@/shared'

const useAddTeacher = () => {
  const firstName = ref('')
  const lastName = ref('')
  const patronymic = ref('')
  const password = ref('')

  const addTeacher = async () => {
    const notValid = firstName.value === '' || lastName.value === '' || password.value === ''
    if (!store.state.userInfo || notValid) return
    await useFetch({
      path: 'markMethods/institution.registerTeacher',
      data: {
        institutionID: store.getters.IID,
        firstName: firstName.value,
        lastName: lastName.value,
        patronymic: patronymic.value,
        password: password.value
      }
    })
  }

  return {
    firstName, lastName, patronymic, password, addTeacher
  }
}

export default useAddTeacher
