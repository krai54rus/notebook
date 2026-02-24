<template>
  <div>
    <h2>User profile</h2>

    <div v-if="isUserReady">
      <p>
        {{ user.name }}
        <span v-if="user.age && user.age > 18">(adult)</span>
        <span v-else>(child)</span>
      </p>

      <input :value="user.name" @input="handleInput" />

      <button @click="handleSave">Save</button>

      <button @click="handleReload">Reload</button>
    </div>
    <div v-else>Loading...</div>

    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, computed } from 'vue'
  import { useUser } from '@/composables/user'
  const { user, loading, error, userApi } = useUser()

  const isUserReady = computed(() => user.value && !loading.value)

  const handleReload = () => {
    userApi.getUser()
  }
  const handleSave = () => {
    userApi.saveUser()
  }

  function handleInput(e) {
    console.log('hI ', e.target.value)
    if (e.target.value.length > 20) {
      // alert('Too long name')
      console.log('too long name')
    }
  }

  // watch(user, () => {
  //   console.log('user changed')
  // })

  onMounted(() => {
    userApi.getUser()
  })
</script>
