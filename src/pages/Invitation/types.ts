export interface IInvitationInfo {
  id: number,
  groupID: number,
  inviterID: number,
  textID: number,
  expoirationDate: string,
  maxNumberOfUses: number,
  totalUses: number,
  status: string
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
