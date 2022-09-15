import { IRobot } from "@/shared"

export type GroupNavItem = 'Студенты' | 'Преподаватели'

export interface IGroupButton {
  groupID: number, //id: number,
  groupName: string //name: string
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
