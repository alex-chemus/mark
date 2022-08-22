import { IInstitution, useFetch } from "@/shared"
import { InjectionKey } from "vue"
import { Store, createStore } from "vuex"
import { IState, IUserInfo } from "./types"

export type Key = InjectionKey<Store<IState>>

export const store = createStore<IState>({
  state: {
    userInfo: null,
    token: null,
    institution: null
  },

  mutations: {
    setUserInfo(state, value: IUserInfo) {
      state.userInfo = value
    },

    setToken(state, value: string) {
      state.token = value
    },

    setInstitution(state, value: IInstitution) {
      state.institution = value
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
  },

  actions: {
    async fetchInstituion({ commit, getters }) {
      if (!getters.IID) return
      const { response } = await useFetch({
        path: 'markMethods/institution.getInfo',
        data: { institutionID: getters.IID }
      })
      commit('setInstitution', response as IInstitution)
    },

    async fetchUserInfo({ commit }) {
      const { response } = await useFetch({ path: 'markMethods/account.getInfo' })
      commit('setUserInfo', {
        id: response.findcreekID,
        additionalData: response.additionalData,
        institutionData: response.institutionData,
        portfolio: response.portfolio
      } as IUserInfo)
    }
  }
})
