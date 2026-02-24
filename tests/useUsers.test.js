import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUserMutations } from '../composables/useUsers'

// Mock the @vue/apollo-composable
vi.mock('@vue/apollo-composable', () => ({
  useQuery: vi.fn(() => ({
    result: { value: { users: [] } },
    loading: { value: false },
    error: { value: null },
    refetch: vi.fn()
  })),
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    loading: { value: false },
    error: { value: null }
  }))
}))

describe('useUsers composable', () => {
  describe('useUserMutations', () => {
    it('initializes with modal closed', () => {
      const { isModalOpen } = useUserMutations()
      expect(isModalOpen.value).toBe(false)
    })

    it('toggleModal changes modal state', () => {
      const { isModalOpen, toggleModal } = useUserMutations()
      
      expect(isModalOpen.value).toBe(false)
      toggleModal(true)
      expect(isModalOpen.value).toBe(true)
      toggleModal(false)
      expect(isModalOpen.value).toBe(false)
    })

    it('provides mutation functions', () => {
      const { addUser, editUser, removeUser } = useUserMutations()
      
      expect(typeof addUser).toBe('function')
      expect(typeof editUser).toBe('function')
      expect(typeof removeUser).toBe('function')
    })

    it('provides loading states', () => {
      const { createLoading, updateLoading, deleteLoading } = useUserMutations()
      
      expect(createLoading).toBeDefined()
      expect(updateLoading).toBeDefined()
      expect(deleteLoading).toBeDefined()
    })

    it('provides error states', () => {
      const { createError, updateError, deleteError } = useUserMutations()
      
      expect(createError).toBeDefined()
      expect(updateError).toBeDefined()
      expect(deleteError).toBeDefined()
    })
  })
})
