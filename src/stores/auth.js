// stores/counter.js
import { defineStore } from 'pinia'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'

export const auth = getAuth()

export const useFirebaseAuth = defineStore('auth', {
  state: () => ({
    user: null,
    errMsg: null,
    loading: false
  }),
  actions: {
    async login(email, password) {
      this.loading = true
      await signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          this.user = user
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          switch (error.code) {
            case 'auth/invalid-email':
              this.errMsg.value = 'Invalid email'
              break
            case 'auth/user-not-found':
              this.errMsg.value = 'No account with that email was found'
              break
            case 'auth/wrong-password':
              this.errMsg.value = 'Incorrect password'
              break
            default:
              this.errMsg.value = 'Email or password was incorrect'
              break
          }
        })
    },
    async register(email, password) {
      this.loading = true
      await createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          if (user) {
            this.user = user
            updateProfile(user, {
              displayName: '',
              photoURL: ''
            })
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    async googleSignIn() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider).then(() => {
        console.log('User signed in')
      })
    },
    async handleSignOut() {
      await signOut(auth)
      this.user = null
    }
  },
  getters: {
    isLoading(state) {
      return state.loading
    }
  }
})
