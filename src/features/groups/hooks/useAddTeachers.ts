import { ref } from 'vue'
import { store } from '@/store'
import { IUserItem, useFetch, IError } from '@/shared'

interface IListItem extends IUserItem {
  selected: boolean
}

interface IParams {
  group: number
}

const useAddTeachers = () => {
  const teachersList = ref<IListItem[] | null>(null)

  const addTeachers = async ({ group }: IParams) => {
    if (!teachersList.value || teachersList.value.length === 0) return
    const teachersIDs = teachersList.value
      .filter(teacher => teacher.selected)
      .map(teacher => teacher.uid).join(', ')

    const { response, error } = await useFetch({
      path: 'markMethods/group.addTeachers',
      data: {
        teachersIDs,
        groupID: group
      }
    })

    if (error) {
      store.commit('setError', error as IError)
      console.log(error)
      return null // eslint-disable-line
    } else {
      return response // eslint-disable-line
    }
  }

  return { teachersList, addTeachers }
}

export default useAddTeachers
