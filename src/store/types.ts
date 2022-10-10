import {
  Role, IInstitution, IError, IRobot
} from "@/shared"

export interface IUserInfo {
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

export type IGroupUsers = number[] | {
  [key: string]: number
}

export interface IGroupInfo {
  groupID: number,
  groupName: string,
  institutionID: number,
  users: {
    students: IGroupUsers,
    robots: IRobot[],
    teachers: IGroupUsers,
  },
  headStudentID: number,
  deputyHeadStudentID: number,
  additionalData: {
    groupAvatar: string,
    creationDate: string,
    creatorFindcreekID: number,
    facultyID: number,
    departmentID: number,
    enabledRoles: number,
    headStudentCanManageCloud: boolean,
    ownerType: string,
    status: string
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
  defaultAvatar: string,
  groups: IGroupInfo[]
}
