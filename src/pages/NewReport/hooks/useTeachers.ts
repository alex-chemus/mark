import { ref, Ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'

const useTeachers = () => {
  const teacherIDs = ref<number[] | null>(null)

  interface IParams {
    groupID: number,
    isValid: Ref<boolean>
  }

  const fetchTeachers = async ({ groupID, isValid }: IParams) => {
    if (!isValid.value) return

    const { response, error } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: {
        groupsIDs: groupID
      }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    } else {
      teacherIDs.value = response[0].users.teachers
    }
  }

  return { teacherIDs, fetchTeachers }
}

export default useTeachers
