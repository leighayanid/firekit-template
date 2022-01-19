import { ref } from 'vue'
import * as yup from 'yup'

export function useForm() {
  const email = ref('')
  const password = ref('')
  const toggle = ref(false)

  const schema = yup.object({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(8)
  })

  return { email, password, toggle, schema }
}
