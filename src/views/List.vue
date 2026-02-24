<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
        <button
          @click="openAddModal"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          + Add User
        </button>
      </div>

      <UserList
        :users="users?.users || []"
        :loading="loading"
        :error="error"
        @edit="openEditModal"
        @delete="handleDelete"
      />

      <UserModal
        :is-open="isModalOpen"
        :user="selectedUser"
        :loading="mutationLoading"
        :error="mutationError"
        @close="closeModal"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useUsers, useUserMutations } from './composables/useUsers'
  import UserList from './components/UserList.vue'
  import UserModal from './components/UserModal.vue'

  const { users, loading, error, refetch } = useUsers()
  const { addUser, editUser, removeUser, isModalOpen, toggleModal } =
    useUserMutations()

  const selectedUser = ref(null)
  const mutationLoading = ref(false)
  const mutationError = ref(null)

  const openAddModal = () => {
    selectedUser.value = null
    toggleModal(true)
  }

  const openEditModal = user => {
    selectedUser.value = user
    toggleModal(true)
  }

  const closeModal = () => {
    selectedUser.value = null
    mutationError.value = null
    toggleModal(false)
  }

  const handleSubmit = async userData => {
    mutationLoading.value = true
    mutationError.value = null

    try {
      if (selectedUser.value) {
        // Update existing user
        await editUser(selectedUser.value.id, {
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
      } else {
        // Create new user
        await addUser({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        })
      }

      // Refetch users list
      await refetch()
      closeModal()
    } catch (err) {
      mutationError.value = err.message
    } finally {
      mutationLoading.value = false
    }
  }

  const handleDelete = async userId => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await removeUser(userId)
        await refetch()
      } catch (err) {
        alert('Error deleting user: ' + err.message)
      }
    }
  }
</script>
