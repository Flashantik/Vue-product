import * as fb from 'firebase'

class Ad {
  constructor (title, description, fullDiscription, price, imageSrc = '', id = null) {
    this.title = title
    this.description = description
    this.fullDiscription = fullDiscription
    this.price = price
    this.imageSrc = imageSrc
    this.id = id
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
      const image = payload.image
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.fullDiscription,
          payload.price,
          '',
          getters.user.id
        )

        const ad = await fb.database().ref('ads').push(newAd)                   // Подключение к бд у firebase которая будет иметь таблицу ads
        const imgExt = image.name.slice(image.name.lastIndexOf('.'))

        const fileData = await fb.storage().ref(`ads/${ad.key}${imgExt}`).put(image)
        let imageSrc = null
        await fileData.ref.getDownloadURL().then(function (downloadUrl) {
          imageSrc = downloadUrl
        })
        await fb.database().ref('ads').child(ad.key).update({
          imageSrc
        })
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
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
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.description,
              ad.fullDiscription,
              ad.price,
              ad.imageSrc,
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
