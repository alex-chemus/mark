export interface IResponseAttendance {
  userID: number | string,
  firstName: string,
  lastName: string,
  patronymic: string,
  isPresent: boolean,
  status: string
}

export interface IUserAttendance {
  isPresent: boolean,
  uid: string | number,
  fullName: string,
  avatar: string
}

export interface IReportInfo {
  id: number,
  textID: string,
  groupID: number,
  creatorID: number,
  date: string,
  students: {
    userID: number | string,
    type: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    isPresent: boolean,
    status: string
  }[],
  sendedTo: number[]
  groupName: string,
  institutionData: {
    institutionID: number,
    shortName: string,
    fullName: string
  }
}

export type AttendanceFilter = 'all' | 'present' | 'absent'

