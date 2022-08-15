import type { InjectionKey, Ref } from "vue"
import { NavItem, IGroupName } from "./types"

export const currentNavKey = Symbol() as InjectionKey<Ref<NavItem>>
export const groupKey = Symbol() as InjectionKey<Ref<string>>
export const groupsListKey = Symbol() as InjectionKey<Ref<IGroupName[]>>
export const currentGroupKey = Symbol() as InjectionKey<Ref<number>>
export const setCurrentGroupKey = Symbol() as InjectionKey<(value: number) => void>
