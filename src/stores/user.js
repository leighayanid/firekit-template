import { defineStore } from 'pinia'
import { getAuth, updateEmail, updateProfile } from 'firebase/auth'

const auth = getAuth()

export const useUser = defineStore('user', {
    state: () => ({
        user: [],
        errMsg: null,
        loading: false
    }),
    actions: {
        async getUser() {
            try {
                this.user = auth.currentUser
            } catch (err) {
                console.log(err)
            }
        },
        async updateProfileInfo(data) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: data.name,
                    photoURL: data.imgsrc
                })
            } catch (err) {
                console.log(err.message)
            }
        },
        async updateEmailInfo(email) {
            try {
                const user = await updateEmail(getAuth.currentUser, {
                    email: email.value
                })
                this.user = user
            } catch (err) {
                console.log(err)
            }
        }
    },
    getters: {
        fullName: (state) => {
            return state.user.displayName
        },
        email: (state) => {
            return state.user.email
        },
        avatar: (state) => {
            return state.user.photoURL
        }
    }
})
