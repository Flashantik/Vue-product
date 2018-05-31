import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

import * as fb from 'firebase'        /// Инициализация firebase

import '../css/style.css'

Vue.use(Vuetify)
let app
Vue.config.productionTip = false
fb.initializeApp({
  apiKey: 'AIzaSyB1bpOyiELniijKhmrPpwLK5YyvrXyr7iU',
  authDomain: 'soft-planet.firebaseapp.com',
  databaseURL: 'https://soft-planet.firebaseio.com',
  projectId: 'soft-planet',
  storageBucket: 'soft-planet.appspot.com',
  messagingSenderId: '93938858993'
})
/* eslint-disable no-new */
fb.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {
        if (user) {
          this.$store.dispatch('autoLoginUser', user)
        }
      }
    })
  }
})
