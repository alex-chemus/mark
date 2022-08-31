import { ref } from 'vue'
import { store } from '@/store'
import { IUserItem, IError } from '../types'
import useFetch from './useFetch'

interface IParams {
  userIds: string,
  excludeIds?: number[]
}

const useFetchUsers = () => {
  const users = ref<IUserItem[] | null>(null)

  const fetchUsers = async ({ userIds, excludeIds }: IParams) => {
    const { response, error } = await useFetch({
      path: 'methods/users.getInfo',
      data: { userIds }
    })
    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
      return null
    } else {
      users.value = response
        .map((user: any) => ({
          uid: +user.id,
          fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`,
          avatar: user.additionalData.avatarData.avatarCompressed
        } as IUserItem))
        /* eslint-disable */
        .filter((u: IUserItem) => excludeIds
          ? !excludeIds.includes(u.uid)
          : true
        )
        /* eslint-enable */
      return users.value
    }
  }

  return { users, fetchUsers }
}

export default useFetchUsers
