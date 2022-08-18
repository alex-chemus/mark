import type { InjectionKey } from "vue"

export const reloadKey = Symbol() as InjectionKey<() => void>
