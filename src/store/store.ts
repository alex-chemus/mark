import { InjectionKey } from "vue"
import { Store, createStore } from "vuex"
import { IState, IUserInfo } from "./types"

export type Key = InjectionKey<Store<IState>>

export const store = createStore<IState>({
  state: {
    infoLoaded: false,
    userInfo: null
  },

  mutations: {
    setUserInfo(state, value: IUserInfo) {
      state.userInfo = value
    },

    setInfoLoaded(state, value: boolean) {
      state.infoLoaded = value
    }
  },

  getters: {
    roles(state) {
      if (state.userInfo)
        return state.userInfo.additionalData.roles
      else
        return null
    }
  }
})
