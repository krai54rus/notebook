import { ref } from 'vue'

export const useUser = () => {
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const userApi = {
    getUser: async () => {
      loading.value = true
      error.value = null

      try {
        const res = await fetch('/api/user')
        if (res) {
          user.value = res
        }
      } catch (err) {
        user.value = { name: 'zheka', age: 26 }
        error.value = 'Error loading user'
      } finally {
        loading.value = false
      }
    },
    saveUser: async () => {
      loading.value = true
      error.value = null
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify(user),
        })

        if (res.ok) {
          user.value = res.body
          loading.value = false
        }
      } catch (err) {
        error.value = 'Error save user'
      } finally {
        loading.value = false
      }
    },
  }

  return { user, loading, error, userApi }
}
