import { IError, IInstitution, useFetch } from "@/shared"
import { InjectionKey } from "vue"
import { Store, createStore } from "vuex"
import { IState, IUserInfo } from "./types"

export type Key = InjectionKey<Store<IState>>

export const store = createStore<IState>({
  state: {
    userInfo: null,
    token: null,
    institution: null,
    error: {
      error_code: 0,
      error_msg: ''
    },
    redirectUrl: `https://id.findcreek.com/auth/?redirectTo=${encodeURIComponent('https:/mark.findcreek.com/auth/')}`
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
    },

    setError(state, value: IError) {
      state.error = value
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
      const { response, error } = await useFetch({
        path: 'markMethods/institution.getInfo',
        data: { institutionID: getters.IID }
      })
      if (error) {
        commit('setError', error as IError)
        console.log(error)
      } else {
        commit('setInstitution', response as IInstitution)
      }
    },

    async fetchUserInfo({ commit }) {
      const { response, error } = await useFetch({ path: 'markMethods/account.getInfo' })
      if (error) {
        commit('setError', error as IError)
        console.log(error)
      } else {
        commit('setUserInfo', {
          id: response.findcreekID,
          additionalData: response.additionalData,
          institutionData: response.institutionData,
          portfolio: response.portfolio
        } as IUserInfo)
      }
    }
  }
})
