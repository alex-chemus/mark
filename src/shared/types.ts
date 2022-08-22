import { IFaculty, IStaff } from "@/pages/Institution/types"

export type Role = 'user' | 'admin' | 'teacher' | 'administrator_of_institution'

export interface IGroupUser {
  img?: string,
  fullName: string,
  badgeText?: string
}

export interface IUserItem {
  uid: number,
  fullName: string,
  avatar: string
}

export interface IInstitution {
  id: number,
  shortName: string,
  fullName: string,
  additionalData: {
    avatar: string,
    faculties: IFaculty[],
    staff: {
      teachers: IStaff[],
      // eslint-disable-next-line
      administrators_of_institution: IStaff[],
      news_makers: any[]
    },
    registrationDate: string,
    subscriptionExpirationDate: string,
    subscriptionIsActive: boolean
  },
  groups: number[],
  countryCode: string,
  subdivisionCode: number,
  cityCode: number
}
