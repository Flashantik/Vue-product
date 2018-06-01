import * as fb from 'firebase'

class Ad {
  constructor (title, description, fullDiscription, imgSrc, price, id = null, idOwner = null) {
    this.title = title
    this.description = description
    this.fullDiscription = fullDiscription
    this.imgSrc = imgSrc
    this.price = price
    this.id = id
    this.idOwner = idOwner
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.fullDiscription,
          // payload.imgSrc,
          payload.price,
          getters.user.id
        )
        const ad = await fb.database().ref('ads').push(newAd)       // Подключение к бд у firebase которая будет иметь таблицу ads
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultAds = []
      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        console.log(ads)
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.fullDiscription,
              ad.imgSrc,
              ad.price,
              key
            )
          )
        })
        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)    // все кажется я устал
      }
    }
  }
}
