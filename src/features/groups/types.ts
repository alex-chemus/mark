export type GroupNavItem = 'Студенты' | 'Преподаватели'

export interface IGroupUser {
  img?: string,
  fullName: string,
  badgeText?: string
}

export interface IGroupButton {
  id: number,
  name: string
}
