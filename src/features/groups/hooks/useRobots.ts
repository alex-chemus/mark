import { computed, Ref } from "vue"
import { useFetch, IError, IRobot } from "@/shared"
import { store, IGroupInfo } from "@/store"
//import { IGroupInfo } from '../types'

interface IParams {
  //groupInfo: Ref<IGroupInfo | null>
  groupID: Ref<number | null>
}

const useRobots = ({ groupID }: IParams) => {
  /*const sortedRobots = computed(() => {
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
  })*/

  const deleteRobot = async (robotID: string, callback?: () => void) => {
    const groupInfo: IGroupInfo = store.getters.getGroups(groupID.value)
    if (!groupInfo) return

    const { error } = await useFetch({
      path: 'markMethods/group.deleteRobots',
      data: {
        groupID: groupInfo.groupID,
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

  const sortedRobots = computed(() => {
    const groupInfo: IGroupInfo = store.getters.getGroups(groupID.value)

    if (!groupID.value || !groupInfo) return null

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

    return [...groupInfo.users.robots].sort(compare)
  })

  return { sortedRobots, deleteRobot }
}

export default useRobots
