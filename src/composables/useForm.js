import { ref, defineEmits } from 'vue'
import * as yup from 'yup'

export function useForm() {
  const email = ref('')
  const password = ref('')
  const toggle = ref(false)

  const schema = yup.object({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(8)
  })

  // eslint-disable-next-line no-undef
  const emit = defineEmits(['submit'])

  function login() {
    emit('submit', { email: email.value, password: password.value })
  }

  return { email, password, toggle, schema }
}
