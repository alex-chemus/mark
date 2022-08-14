import { Role } from "@/shared"

export interface IUserInfo {
  id: number,
  firstName: string,
  lastName: string,
  patronymic: string,
  textID: string,
  email: string,
  additionalData: {
    roles: Role[],
    deleteAccount: boolean,
    deleteAccountDate: string,
    deleteAccountReason: string,
    banAccount: boolean,
    banAccountDate: string,
    banAccountReason: string,
    banAccountExpiration: string,
    avatarData: {
      avatar: string,
      avatarCompressed: string,
      avatarShiftX: number,
      avatarShirtY: number,
      avatarScale: number
    },
    sex: number,
  },
}

export interface IState {
  userInfo: IUserInfo | null,
  infoLoaded: boolean
}
