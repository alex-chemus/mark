export type Role = 'user' | 'admin' | 'teacher' | 'administrator_of_institution'

export interface IGroupUser {
  img?: string,
  fullName: string,
  badgeText?: string
}
