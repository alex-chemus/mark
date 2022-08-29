import type { InjectionKey, Ref } from "vue"

interface Params {
  folderID: number | null,
  groupID: number
}

export const folderIDKey = Symbol() as InjectionKey<Ref<number | null>>
export const setFolderIDKey = Symbol() as InjectionKey<(value: number) => void>
export const fetchFolderInfoKey = Symbol() as InjectionKey<({ folderID, groupID }: Params) => Promise<void>>
