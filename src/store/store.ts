import { InjectionKey } from "vue"
import { Store, createStore } from "vuex"
import { IState } from "./IState"

export type Key = InjectionKey<Store<IState>>

export const store = createStore<IState>({})
