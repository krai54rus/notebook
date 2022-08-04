<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import * as icons from './icons.js'

  interface Props {
    name: string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
  })

  const currIcon = computed(() => icons[props.name])

  const emit = defineEmits(['click'])
  const handleClick = params => {
    emit('click', params)
  }
</script>
<template>
  <div
    class="n-flex n-justify-center n-align-center"
    v-html="currIcon"
    @click="handleClick()"
  ></div>
</template>

<style lang="scss" module></style>
