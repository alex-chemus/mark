import { ref } from 'vue'
import { IUserItem, useFetch } from '@/shared'

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

    const { response } = await useFetch({
      path: 'markMethods/group.addTeachers',
      data: {
        teachersIDs,
        groupID: group
      }
    })

    return response // eslint-disable-line
  }

  return { teachersList, addTeachers }
}

export default useAddTeachers
