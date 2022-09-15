import { ref } from 'vue'
import { store } from '@/store'
import { useFetch, IError } from '@/shared'
import { IGroupInfo } from '../types'

interface IParams {
  groupInfo: IGroupInfo
}

const useAddRobot = ({ groupInfo }: IParams) => {
  const firstName = ref('')
  const lastName = ref('')
  const patronymic = ref('')

  const addRobot = async () => {
    const { error } = await useFetch({
      path: 'markMethods/group.addRobots',
      data: {
        groupID: groupInfo.groupID,
        robots: JSON.stringify([{
          firstName: firstName.value,
          lastName: lastName.value,
          patronymic: patronymic.value
        }])
      }
    })

    if (error) {
      console.log(error)
      store.dispatch('setError', error as IError)
    }
  }

  return {
    firstName, lastName, patronymic, addRobot
  }
}

export default useAddRobot
