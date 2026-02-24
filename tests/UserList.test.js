import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserList from '../components/UserList.vue'

describe('UserList.vue', () => {
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  ]

  it('renders users correctly', () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
        loading: false,
        error: null
      }
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
    expect(wrapper.text()).toContain('Jane Smith')
    expect(wrapper.text()).toContain('jane@example.com')
  })

  it('displays loading state', () => {
    const wrapper = mount(UserList, {
      props: {
        users: [],
        loading: true,
        error: null
      }
    })

    expect(wrapper.text()).toContain('Loading users...')
  })

  it('displays error state', () => {
    const wrapper = mount(UserList, {
      props: {
        users: [],
        loading: false,
        error: { message: 'Network error' }
      }
    })

    expect(wrapper.text()).toContain('Error loading users')
    expect(wrapper.text()).toContain('Network error')
  })

  it('displays empty state when no users', () => {
    const wrapper = mount(UserList, {
      props: {
        users: [],
        loading: false,
        error: null
      }
    })

    expect(wrapper.text()).toContain('No users found')
  })

  it('emits edit event when edit button is clicked', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
        loading: false,
        error: null
      }
    })

    const editButtons = wrapper.findAll('button').filter(btn => btn.text() === 'Edit')
    await editButtons[0].trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0]).toEqual([mockUsers[0]])
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
        loading: false,
        error: null
      }
    })

    const deleteButtons = wrapper.findAll('button').filter(btn => btn.text() === 'Delete')
    await deleteButtons[0].trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual(['1'])
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
        loading: false,
        error: null
      }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
  })

  it('displays user roles with correct styling', () => {
    const wrapper = mount(UserList, {
      props: {
        users: mockUsers,
        loading: false,
        error: null
      }
    })

    const roleBadges = wrapper.findAll('.bg-blue-100')
    expect(roleBadges).toHaveLength(2)
    expect(roleBadges[0].text()).toBe('admin')
  })
})
