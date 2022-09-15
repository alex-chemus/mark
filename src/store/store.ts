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
    redirectUrl: `https://id.findcreek.com/auth/?redirectTo=${encodeURIComponent('https://mark.findcreek.com/auth')}`,
    errorsCount: 0,
    redirectDomain: `https://id.findcreek.com/auth/?redirectTo=`,
    defaultAvatar: 'https://findcreek.com/assets/img/unknown-user.png'
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
    },

    incrementError(state) {
      state.errorsCount += 1
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
    async fetchInstituion({ commit, getters, state }) {
      if (!getters.IID) return
      const { response, error } = await useFetch({
        path: 'markMethods/institution.getInfo',
        data: { institutionID: getters.IID }
      })
      if (error) {
        commit('setError', error as IError)
        commit('incrementError')
        console.log(error)
        if (error.error_msg === 'Invalid token.')
          location.href = state.redirectUrl
      } else {
        commit('setInstitution', response as IInstitution)
      }
    },

    async fetchUserInfo({ commit, state }) {
      const { response, error } = await useFetch({ path: 'markMethods/account.getInfo' })
      if (error) {
        commit('setError', error as IError)
        commit('incrementError')
        console.log(error)
        if (error.error_msg === 'Invalid token.')
          location.href = state.redirectUrl
      } else {
        commit('setUserInfo', {
          id: response.findcreekID,
          additionalData: response.additionalData,
          institutionData: response.institutionData,
          portfolio: response.portfolio
        } as IUserInfo)
      }
    },

    setError({ commit }, error: IError) {
      commit('incrementError')
      commit('setError', error)
    }
  }
})
