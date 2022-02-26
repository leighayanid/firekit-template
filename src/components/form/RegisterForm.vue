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

function register() {
  emit('submit', { email: email.value, password: password.value })
}
</script>

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
          class="mb-2 rounded border border-slate-800 p-2 text-slate-800"
        />
        <span class="mb-2 text-sm capitalize text-red-600">{{
          errors.email
        }}</span>
      </div>
      <div class="form-group mb-2 flex flex-col">
        <label for="email">Password</label>
        <div class="relative">
          <Field
            v-model="password"
            data-test="password"
            name="password"
            :type="!toggle ? 'password' : 'text'"
            placeholder="password"
            class="
              relative
              mb-2
              w-full
              rounded
              border border-slate-800
              p-2
              text-slate-800
            "
          />
          <div class="absolute inset-y-2 right-0 pr-3">
            <div class="flex items-center" @click="toggle = !toggle">
              <EyeIcon v-if="toggle" class="h-6 w-6 text-slate-800" />
              <EyeOffIcon v-else class="h-6 w-6 text-slate-800" />
            </div>
          </div>
        </div>
        <span class="mb-2 text-sm capitalize text-red-600">{{
          errors.password
        }}</span>
      </div>
      <p v-if="errMsg" class="text-red-500">{{ errMsg }}</p>

      <button
        class="mb-2 w-full rounded bg-slate-700 p-2"
        type="submit"
        :disabled="loading.value"
      >
        {{ loading.value ? 'Please wait...' : 'Register' }}
      </button>
    </Form>
  </div>
</template>