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

export interface ITeacherCreds {
  firstName: string,
  lastName: string,
  patronymic: string,
  textID: string,
  password: string
}
