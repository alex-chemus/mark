export type GroupNavItem = 'Студенты' | 'Преподаватели'

export interface IGroupButton {
  groupID: number, //id: number,
  groupName: string //name: string
}

export interface IGroupInfo {
  groupID: number,
  groupName: string,
  institutionID: number,
  users: {
    students: number[],
    robotos: number[],
    teachers: number[]
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
