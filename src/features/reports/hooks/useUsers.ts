import { ref } from "vue"
import { store } from "@/store"
import { useFetch, IError } from "@/shared"
import { IUserAttendance, IResponseAttendance } from "../types"

interface IParams {
  usersData: IResponseAttendance[]
}

const useUsers = () => {
  const users = ref<IUserAttendance[] | null>(null)

  const fetchUsers = async ({ usersData }: IParams) => {
    const { response, error } = await useFetch({
      path: 'methods/users.getInfo',
      data: {
        userIds: usersData.map(u => u.userID)
      }
    })

    if (error) {
      store.dispatch('setError', error as IError)
      console.log(error)
    } else {
      users.value = response.map((user: any) => ({
        uid: +user.id,
        fullName: `${user.lastName} ${user.firstName} ${user.patronymic}`,
        avatar: user.additionalData.avatarData.avatarCompressed,
        isPresent: usersData.some(u => u.userID === +user.id && u.isPresent)
      } as IUserAttendance))
    }
  }

  return { users, fetchUsers }
}

export default useUsers
