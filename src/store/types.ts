import { Role, IInstitution, IError } from "@/shared"

export interface IUserInfo {
  /*id: number,
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
  },*/
  id: number,
  additionalData: {
    roles: Role[],
    inGroups: number[],
    ownGroups: number[],
    teacherSubscriptionExpirationDate: string,
    teacherSubscriptionIsActive: boolean
  },
  institutionData: {
    institutionID: number,
    groupID: number,
    inGroup: boolean,
    groupRole: string // todo: сделать отдельно роли в группе
    groupStatus: string
  },
  portfolio: {
    works: any[],
    awards: any[]
  }
}

export interface IState {
  userInfo: IUserInfo | null,
  token: string | null,
  institution: IInstitution | null,
  error: IError,
  redirectUrl: string,
  errorsCount: number,
  redirectDomain: string,
  defaultAvatar: string
}
