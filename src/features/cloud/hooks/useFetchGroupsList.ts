import { ref } from 'vue'
import { store } from '@/store'
import { IError, useFetch } from '@/shared'
import { IGroupName } from '../types'
//import { IGroupName } from '../types'

const useFetchGroupsList = () => {
  const groupsList = ref<IGroupName[] | null>(null)

  const getGroupsIDs = async (): Promise<number[] | null> => {
    if (!store.state.userInfo) return null

    if (store.getters.roles.includes('teacher')) {
      return [
        ...store.state.userInfo.additionalData.inGroups,
        ...store.state.userInfo.additionalData.ownGroups
      ]
    } else { // is an admin
      const { response, error } = await useFetch({
        path: 'markMethods/institution.getInfo',
        data: {
          institutionID: store.getters.IID,
          fields: 'groups'
        }
      })

      if (error) {
        store.commit('setError', error as IError)
        console.log(error)
        return null
      } else return response.groups
    }
  }

  const fetchGroupsList = async () => {
    if (!store.state.userInfo) return

    const groupsIDs = await getGroupsIDs()
    if (!groupsIDs) return

    const { response, error } = await useFetch({
      path: 'markMethods/group.getInfo',
      data: { groupsIDs }
    })

    if (error) {
      store.commit('setError', error as IError)
      console.log(error)
    } else groupsList.value = response.map((i: any) => ({
      groupID: i.groupID,
      groupName: i.groupName
    } as IGroupName))
  }

  return { groupsList, fetchGroupsList }
}

export default useFetchGroupsList
