import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = initializeApp(firebaseConfig)

// export firebaseapp
export const firebase = firebaseApp.firestore()
