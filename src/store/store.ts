import { InjectionKey } from "vue"
import { Store, createStore } from "vuex"
import { IState, IUserInfo } from "./types"

export type Key = InjectionKey<Store<IState>>

export const store = createStore<IState>({
  state: {
    userInfo: null,
    token: null
  },

  mutations: {
    setUserInfo(state, value: IUserInfo) {
      state.userInfo = value
    },

    setToken(state, value: string) {
      state.token = value
    }
  },

  getters: {
    roles(state) {
      if (state.userInfo)
        return state.userInfo.additionalData.roles
      else
        return null
    },

    IID(state) {
      if (state.userInfo)
        return state.userInfo.institutionData.institutionID
      else
        return null
    }
  }
})
