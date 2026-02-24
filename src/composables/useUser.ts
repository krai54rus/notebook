import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useToggle } from '@vueuse/core'
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../graphql/users'

export function useUsers() {
  const { result, loading, error, refetch } = useQuery(GET_USERS)
  const users = ref([])

  // Watch for query results
  const loadUsers = () => {
    if (result.value?.users) {
      users.value = result.value.users
    }
  }

  return {
    users: result,
    loading,
    error,
    refetch,
    loadUsers,
  }
}

export function useUserMutations() {
  const [isModalOpen, toggleModal] = useToggle(false)

  const {
    mutate: createUser,
    loading: createLoading,
    error: createError,
  } = useMutation(CREATE_USER)
  const {
    mutate: updateUser,
    loading: updateLoading,
    error: updateError,
  } = useMutation(UPDATE_USER)
  const {
    mutate: deleteUser,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation(DELETE_USER)

  const addUser = async userData => {
    try {
      const result = await createUser({
        input: userData,
      })
      return result
    } catch (err) {
      console.error('Error creating user:', err)
      throw err
    }
  }

  const editUser = async (id, userData) => {
    try {
      const result = await updateUser({
        id,
        input: userData,
      })
      return result
    } catch (err) {
      console.error('Error updating user:', err)
      throw err
    }
  }

  const removeUser = async id => {
    try {
      const result = await deleteUser({ id })
      return result
    } catch (err) {
      console.error('Error deleting user:', err)
      throw err
    }
  }

  return {
    addUser,
    editUser,
    removeUser,
    isModalOpen,
    toggleModal,
    createLoading,
    updateLoading,
    deleteLoading,
    createError,
    updateError,
    deleteError,
  }
}
