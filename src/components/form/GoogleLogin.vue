<template>
  <button class="mb-2 w-full rounded bg-red-700 p-2" @click="signInWithGoogle">
    <span> <!-- insert google logo svg with 24 by 24 size --> </span>Sign In
    with Google
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from '@/stores/auth'
const auth = useFirebaseAuth()
const router = useRouter()

const signInWithGoogle = async () => {
  await auth.googleSignIn()
  router.push('/crud')
}
</script>
