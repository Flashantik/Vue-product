import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGuard'
import AppHome from '../components/Home.vue'
import AppLogin from '../components/Auth/Login.vue'
import AppRegistration from '../components/Auth/Registration.vue'
import AppBuy from '../components/Buy/Buy.vue'
// import AppOrder from '../components/Order/Order.vue'
import AppAdsAdd from '../components/Buy/ads-add.vue'
import AppAd from '../components/Buy/ad.vue'
import RegAnoth from '../components/Auth/RegistrationAnother.vue'
import AppError from '../components/error.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/Login',
    name: 'Login',
    component: AppLogin
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: AppRegistration
  },
  {
    path: '/Registration/other',
    name: 'RegistrationAnother',
    component: RegAnoth
  },
  {
    path: '/Buy',
    name: 'Buy',
    component: AppBuy,
    requiresAuth: true,
    beforeEnter: authGuard
  },
  // {
  //   path: '/Order',
  //   name: 'AppOrder',
  //   component: AppOrder
  // },
  {
    path: '/New-ads',
    name: 'AppAdsAdd',
    component: AppAdsAdd
  },
  {
    path: '/buy/:id',
    name: 'Appad',
    props: true,
    component: AppAd
  },
  {
    path: '/*',
    name: 'error',
    component: AppError
  }
  ],
  mode: 'history'
})
