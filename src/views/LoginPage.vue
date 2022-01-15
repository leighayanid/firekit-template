<template>
	<div class="container">
		<div class="flex flex-col">
			<h1 class="mb-2 text-lg">Login with your account</h1>
			<LoginForm @submit="login" />
			<GoogleLogin />
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from '../stores/auth'

//components
import LoginForm from '@/components/form/LoginForm.vue'
import GoogleLogin from '@/components/form/GoogleLogin.vue'

const auth = useFirebaseAuth()
const router = useRouter()

const login = async (payload) => {
	await auth.login(payload.email, payload.password)
	router.push('/crud')
}
</script>
