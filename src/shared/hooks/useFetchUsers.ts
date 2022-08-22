import { ref } from 'vue'
import { IUserItem } from '../types'
import useFetch from './useFetch'

interface IParams {
  userIds: string,
  excludeIds?: number[]
}

const useFetchUsers = () => {
  const users = ref<IUserItem[] | null>(null)

  const fetchUsers = async ({ userIds, excludeIds }: IParams) => {
    const { response } = await useFetch({
      path: 'methods/users.getInfo',
      data: { userIds }
    })
    users.value = response
      .map((user: any) => ({
        uid: +user.id,
        fullName: `${user.firstName} ${user.lastName} ${user.patronymic}`,
        avatar: user.additionalData.avatarData.avatarCompressed
      } as IUserItem))
      /* eslint-disable */
      .filter((u: IUserItem) => excludeIds
        ? !excludeIds.includes(u.uid)
        : true
      )

    console.log(users.value)
    console.log(excludeIds)
      /* eslint-enable */
    return users.value
  }

  return { users, fetchUsers }
}

export default useFetchUsers
