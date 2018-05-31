// import store from '../store'
import fb from 'firebase'

export default function (to, from, next) {
  if (fb.auth().currentUser) {
    next()
  } else {
    next('/login?loginError')
  }
}
