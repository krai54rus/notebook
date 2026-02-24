<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="close"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
          {{ isEdit ? 'Update User' : 'Add New User' }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label
              for="role"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              v-model="formData.role"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>

        <div
          v-if="error"
          class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  })

  const emit = defineEmits(['close', 'submit'])

  const isEdit = ref(false)
  const formData = ref({
    name: '',
    email: '',
    role: '',
  })

  watch(
    () => props.user,
    newUser => {
      if (newUser) {
        isEdit.value = true
        formData.value = { ...newUser }
      } else {
        isEdit.value = false
        formData.value = { name: '', email: '', role: '' }
      }
    },
    { immediate: true }
  )

  const handleSubmit = () => {
    emit('submit', { ...formData.value })
  }

  const close = () => {
    formData.value = { name: '', email: '', role: '' }
    emit('close')
  }
</script>
