import { Role } from "@/shared"

export interface IUserInfo {
  id: number,
  firstName: string,
  lastName: string,
  patronymic: string,
  textID: string,
  email: string,
  additionalData: {
    roles: Role[],
  },
  inGroups: number[],
  ownGroups: number[],
  teachteacherSubscriptionExpirationDater: string,
  teacherSubscriptionIsActive: boolean,
}
