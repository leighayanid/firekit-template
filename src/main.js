import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// firebase
import { initializeApp } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// plugins
import Toaster from '@meforma/vue-toaster'
import { vfmPlugin } from 'vue-final-modal'

// animate
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
// css
import './index.css'

const firebaseConfig = {
  apiKey: 'AIzaSyDaCLgJ93nv4fFutqxZ64yR-84MkCQCUm4',
  authDomain: 'vue3-firebase-auth-11e37.firebaseapp.com',
  projectId: 'vue3-firebase-auth-11e37',
  storageBucket: 'vue3-firebase-auth-11e37.appspot.com',
  messagingSenderId: '787150429787',
  appId: '1:787150429787:web:71d89efc12e5243794a97e'
}

const firebase = initializeApp(firebaseConfig)
const firestoreSettings = {
  timestampsInSnapshots: true
}

getStorage(firebase)
initializeFirestore(firebase, firestoreSettings)

const app = createApp(App)
app.use(vfmPlugin)
app.use(Toaster).provide('toast', app.config.globalProperties.$toast)
app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
