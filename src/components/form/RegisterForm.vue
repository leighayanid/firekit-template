<template>
	<div>
		<Form
			v-slot="{ errors }"
			:validation-schema="schema"
			@submit="register"
			@keyup.enter="register"
		>
			<div class="form-group flex flex-col">
				<label for="email" class="">Email Address</label>
				<Field
					v-model="email"
					name="email"
					type="text"
					placeholder="email address"
					class="p-2 mb-2 rounded text-slate-800 border border-slate-800"
				/>
				<span class="text-sm mb-2 text-red-600 capitalize">{{
					errors.email
				}}</span>
			</div>
			<div class="form-group flex flex-col mb-2">
				<label for="email">Password</label>
				<div class="relative">
					<Field
						v-model="password"
						data-test="password"
						name="password"
						:type="!toggle ? 'password' : 'text'"
						placeholder="password"
						class="
							p-2
							mb-2
							rounded
							text-slate-800
							border border-slate-800
							relative
							w-full
						"
					/>
					<div class="absolute inset-y-2 right-0 pr-3">
						<div class="flex items-center" @click="toggle = !toggle">
							<EyeIcon v-if="toggle" class="h-6 w-6 text-slate-800" />
							<EyeOffIcon v-else class="h-6 w-6 text-slate-800" />
						</div>
					</div>
				</div>
				<span class="text-sm mb-2 text-red-600 capitalize">{{
					errors.password
				}}</span>
			</div>
			<p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>

			<button
				class="bg-slate-700 p-2 mb-2 rounded w-full"
				type="submit"
				:disabled="loading.value"
			>
				{{ loading.value ? 'Please wait...' : 'Register' }}
			</button>
		</Form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'

const email = ref('')
const password = ref('')
const errMsg = ref('')
const toggle = ref(false)

// eslint-disable-next-line no-undef
defineProps({
	loading: {
		type: Boolean,
		default: false
	}
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['submit'])

function register() {
	emit('submit', { email: email.value, password: password.value })
}

const schema = yup.object({
	email: yup.string().required('Email is required').email(),
	password: yup.string().required().min(8)
})
</script>