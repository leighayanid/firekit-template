<template>
  <div>
    <Form
      v-slot="{ errors }"
      :validation-schema="schema"
      data-test="form"
      @submit="login"
      @keyup.enter="login"
    >
      <div class="form-group flex flex-col">
        <label for="email" class="">Email Address</label>
        <Field
          v-model="email"
          data-test="email"
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
            class="p-2 mb-2 rounded text-slate-800 border border-slate-800 relative w-full"
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
      <button
        class="bg-slate-700 p-2 mb-2 rounded w-full"
        type="submit"
        :disabled="loading.value"
      >
        {{ loading.value ? 'Logging in...' : 'Login' }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
import { useForm } from '@/composables/useForm'

const { email, password, toggle, schema } = useForm()
// eslint-disable-next-line no-undef
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['submit'])

function login() {
  emit('submit', { email: email.value, password: password.value })
}
</script>
