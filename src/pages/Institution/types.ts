export type NavItem = 'Структура' | 'Преподаватели'

export interface IFaculty {
  facultyName: string,
  departments?: {
    id: number,
    name: string
  }[]
}
