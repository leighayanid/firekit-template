<template>
	<div class="container">
		<div class="flex flex-col">
			<h1 class="mb-2 text-lg">Create an account</h1>
			<RegisterForm :loading="isLoading" @submit="register" />
			<GoogleLogin />
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import RegisterForm from '@/components/form/RegisterForm.vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from '../stores/auth'
import GoogleLogin from '@/components/form/GoogleLogin.vue'

const auth = useFirebaseAuth()
const router = useRouter()
const isLoading = ref(false)

const register = async (payload) => {
	await auth.register(payload.email, payload.password)
	router.push('/crud')
}

onMounted(() => {
	isLoading.value = computed(() => auth.isLoading)
})
</script>
