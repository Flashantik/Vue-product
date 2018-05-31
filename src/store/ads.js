import * as fb from 'firebase'

class Ad {
  constructor (title, description, fullDiscription, imgSrc, price) {
    this.title = title
    this.description = description
    this.fullDiscription = fullDiscription
    this.imgSrc = imgSrc
    this.price = price
  }
}

export default {
  state: {
    ads: [{
      title: 'first add',
      description: 'hello i am disc',
      fullDiscription: '',
      imgSrc: 'https://do.29.ru/preview//do/1b3a3a34b2d32b8f39353a8cc36d00a0_1517195445_600_480.jpg',
      id: '123'
    },
    {
      title: 'twos add',
      description: 'hello i am disc',
      fullDiscription: '',
      imgSrc: 'https://do.29.ru/preview//do/1b3a3a34b2d32b8f39353a8cc36d00a0_1517195445_600_480.jpg',
      id: '1232'
    }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
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
