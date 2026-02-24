import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserModal from '../components/UserModal.vue'

describe('UserModal.vue', () => {
  it('renders modal when isOpen is true', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    expect(wrapper.find('.fixed').exists()).toBe(true)
    expect(wrapper.text()).toContain('Add New User')
  })

  it('does not render when isOpen is false', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: false,
        user: null,
        loading: false,
        error: null
      }
    })

    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('shows Update User title when editing', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: { id: '1', name: 'John', email: 'john@test.com', role: 'admin' },
        loading: false,
        error: null
      }
    })

    expect(wrapper.text()).toContain('Update User')
  })

  it('populates form with user data when editing', async () => {
    const user = { id: '1', name: 'John Doe', email: 'john@test.com', role: 'admin' }
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: user,
        loading: false,
        error: null
      }
    })

    await wrapper.vm.$nextTick()

    const nameInput = wrapper.find('#name')
    const emailInput = wrapper.find('#email')
    const roleSelect = wrapper.find('#role')

    expect(nameInput.element.value).toBe('John Doe')
    expect(emailInput.element.value).toBe('john@test.com')
    expect(roleSelect.element.value).toBe('admin')
  })

  it('has empty form for new user', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    const nameInput = wrapper.find('#name')
    const emailInput = wrapper.find('#email')
    const roleSelect = wrapper.find('#role')

    expect(nameInput.element.value).toBe('')
    expect(emailInput.element.value).toBe('')
    expect(roleSelect.element.value).toBe('')
  })

  it('emits submit event with form data', async () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    await wrapper.find('#name').setValue('Test User')
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#role').setValue('user')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0][0]).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      role: 'user'
    })
  })

  it('emits close event when cancel button clicked', async () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    const cancelButton = wrapper.findAll('button').find(btn => btn.text() === 'Cancel')
    await cancelButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when clicking outside modal', async () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    await wrapper.find('.fixed').trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('disables submit button when loading', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: true,
        error: null
      }
    })

    const submitButton = wrapper.findAll('button').find(btn => 
      btn.text().includes('Saving') || btn.text().includes('Create')
    )
    
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('displays error message when error prop is provided', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: 'An error occurred'
      }
    })

    expect(wrapper.text()).toContain('An error occurred')
    expect(wrapper.find('.bg-red-100').exists()).toBe(true)
  })

  it('has all required role options', () => {
    const wrapper = mount(UserModal, {
      props: {
        isOpen: true,
        user: null,
        loading: false,
        error: null
      }
    })

    const options = wrapper.find('#role').findAll('option')
    const optionTexts = options.map(opt => opt.text())

    expect(optionTexts).toContain('Admin')
    expect(optionTexts).toContain('User')
    expect(optionTexts).toContain('Moderator')
  })
})
