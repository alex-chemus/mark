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
