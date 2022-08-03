<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import * as icons from './icons.js'

  interface Props {
    name: string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
  })

  console.log('icons ', icons)
  console.log('icons ', icons['constructor'])

  const currIcon = computed(() => icons[props.name])

  const emit = defineEmits(['click'])
  const handleClick = params => {
    emit('click', params)
  }

  //   const emit = defineEmits<{
  //   (e: 'change', id: number): void
  //   (e: 'update', value: string): void
  // }>()
</script>
<template>
  <div
    class="n-flex n-justify-center n-align-center"
    v-html="currIcon"
    @click="handleClick()"
  ></div>
</template>

<style lang="scss" module></style>
