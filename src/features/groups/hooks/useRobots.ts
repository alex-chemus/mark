import { computed, Ref } from "vue"
import { useFetch, IError, IRobot } from "@/shared"
import { store } from "@/store"
import { IGroupInfo } from '../types'

interface IParams {
  groupInfo: Ref<IGroupInfo | null>
}

const useRobots = ({ groupInfo }: IParams) => {
  const sortedRobots = computed(() => {
    if (!groupInfo.value) return null

    function compare(a: IRobot, b: IRobot) {
      const aFullName = `${a.lastName} ${a.firstName} ${a.patronymic}`
      const bFullName = `${b.lastName} ${b.firstName} ${b.patronymic}`
      if (aFullName < bFullName) {
        return -1;
      }
      if (aFullName > bFullName) {
        return 1;
      }
      return 0;
    }

    return [...groupInfo.value.users.robots].sort(compare)
  })

  const deleteRobot = async (robotID: string, callback?: () => void) => {
    if (!groupInfo.value) return

    const { error } = await useFetch({
      path: 'markMethods/group.deleteRobots',
      data: {
        groupID: groupInfo.value.groupID,
        robotsIDs: robotID
      }
    })

    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    } else {
      if (callback) callback() // eslint-disable-line
    }
  }

  return { sortedRobots, deleteRobot }
}

export default useRobots
