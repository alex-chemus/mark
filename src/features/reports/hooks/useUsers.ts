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
        userIds: usersData.map(u => u.userID).filter(id => typeof id === "number")
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
      users.value?.push(
        ...usersData
          .filter(u => typeof u.userID === 'string')
          .map(u => ({
            uid: u.userID,
            fullName: `${u.lastName} ${u.firstName} ${u.patronymic}`,
            avatar: store.state.defaultAvatar,
            isPresent: usersData.some(i => i.userID === u.userID && i.isPresent)
          } as IUserAttendance))
      )
      console.log('fetch users: ', users.value)
    }
  }

  return { users, fetchUsers }
}

export default useUsers
