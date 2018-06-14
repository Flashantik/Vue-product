import * as fb from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

class UserOptions {
  constructor (nickName = '', DOB = '', skills = [''], avatarSrc = '', balans = '', ads = []) {
    this.nickName = nickName
    this.DOB = DOB
    this.skills = skills
    this.avatarSrc = avatarSrc
    this.balans = balans
    this.ads = ads
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    createUser (state, payload) {
      state.UserOptions = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        fb.auth().sendSignInLinkToEmail(email, {
          url: 'https://www.example.com/finishSignUp?cartId=1234',
          // This must be true.
          handleCodeInApp: true,
          iOS: {
            bundleId: 'com.example.ios'
          },
          android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
          }
        })
        commit('setUser', new User(user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchUserOpt ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultUserOpt = []
      try {
        const fbVal = await fb.database().ref('users').once('value')
        const userOpt = fbVal.val()
        Object.keys(userOpt).forEach(key => {
          const user = userOpt[key]
          resultUserOpt.push(
              new UserOptions(
              user.nickName,
              user.DOB,
              user.balans,
              user.avatarSrc,
              user.ads
             )
          )
        })
        commit('createUser', resultUserOpt)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async autoLoginUser ({commit}, payload) {
      commit('setLoading', true)
      try {
        commit('setUser', new User(payload.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    logout ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userlogged (state) {
      return state.user !== null
    },
    userOpt (state) {
      return state.userOpt
    }
  }
}
