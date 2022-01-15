<template>
	<button class="bg-red-700 p-2 mb-2 rounded w-full" @click="signInWithGoogle">
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