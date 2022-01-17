<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { LogoutIcon } from '@heroicons/vue/solid'
import ToggleTheme from './ToggleTheme.vue'

const router = useRouter()
const loggedIn = ref(true)

let auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggedIn.value = true
    } else {
      loggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>

<template>
  <div>
    <nav class="flex">
      <router-link to="/" class="flex-1"><h1>🔥 FireKit</h1></router-link>
      <ul class="flex space-x-5">
        <li><router-link to="/crud">CRUD</router-link></li>
        <span v-if="loggedIn" class="flex space-x-4">
          <li><router-link to="/profile">Profile</router-link></li>
          <button
            v-if="loggedIn"
            class="flex items-center space-x-2 px-2 rounded border"
            @click="handleSignOut"
          >
            <LogoutIcon class="w-4 h-4" />
          </button>
        </span>
        <span v-else class="flex space-x-4">
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
        </span>
        <li><ToggleTheme /></li>
      </ul>
    </nav>
  </div>
</template>
