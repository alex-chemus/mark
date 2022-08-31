import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'
import { ITeacherCreds } from '../types'

const useAddTeacher = () => {
  const firstName = ref('')
  const lastName = ref('')
  const patronymic = ref('')
  const password = ref('')
  const credentials = ref<ITeacherCreds | null>(null)

  const addTeacher = async () => {
    const notValid = firstName.value === '' || lastName.value === '' || password.value === ''
    if (!store.state.userInfo || notValid) return
    const { error, response } = await useFetch({
      path: 'markMethods/institution.registerTeacher',
      data: {
        institutionID: store.getters.IID,
        firstName: firstName.value,
        lastName: lastName.value,
        patronymic: patronymic.value,
        password: password.value
      }
    })

    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    } else {
      credentials.value = response as ITeacherCreds
    }
  }

  return {
    firstName, lastName, patronymic, password, addTeacher, credentials
  }
}

export default useAddTeacher
