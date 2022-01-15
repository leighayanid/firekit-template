import { mount } from '@vue/test-utils'
import LoginForm from '@/components/form/LoginForm.vue'
import { test, it, expect } from 'vitest'

test('LoginForm', async () => {
    it('emits an event with user data payload', () => {
        const wrapper = mount(LoginForm)
        const email = wrapper.get('[data-test="email"]')
        const password = wrapper.get('[data-test="password"]')

        email.setValue('leighdinaya@gmail.com')
        password.setValue('password')

        // Assert event has been emitted
        const formSubmittedCalls = wrapper
            .get('[data-test="form"]')
            .trigger('submit')

        expect(formSubmittedCalls).toHaveLength(1)

        // Assert payload is correct
        const expectedPayload = {
            email: 'leighd@gmail.com',
            password: 'password'
        }
        expect(wrapper.emitted('submit')[0][0]).toMatchObject(expectedPayload)
    })
})
