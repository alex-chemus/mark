export type NavItem = 'Структура' | 'Преподаватели'

interface IDepartment {
  departmentID: number,
  departmentName: string,
  registrationDate: string
}

export interface IFaculty {
  /*facultyName: string,
  departments?: {
    id: number,
    name: string
  }[]*/
  facultyID: number,
  facultyName: string,
  departments: IDepartment[],
  registrationDate: string
}

export interface IStaff {
  userID: number,
  registrationDate: string,
  password: string,
  passwordIsInvalid: boolean
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
  groups: any[],
  countryCode: string,
  subdivisionCode: number,
  cityCode: number
}
