import { IUserItem } from "@/shared"

export interface IResponseAttendance {
  userID: number,
  firstName: string,
  lastName: string,
  patronymic: string,
  isPresent: boolean,
  status: string
}

export interface IUserAttendance extends IUserItem {
  isPresent: boolean
}

export interface IReportInfo {
  id: number,
  textID: string,
  groupID: number,
  creatorID: number,
  date: string,
  students: {
    userID: number,
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

