<script lang="ts" setup>
  const emit = defineEmits(['close'])
  const handleClose = params => {
    emit('close', params)
  }
</script>
<template>
  <div
    class="n-flex n-align-start"
    :class="$style['overlay']"
    @click="handleClose()"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
  $component: overlay;

  .#{$component} {
    background-color: #000000a3;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow-y: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
    cursor: pointer;

    @media only screen and (min-width: 1281px),
      only screen and (min-width: 901px) and (max-width: 1280px) {
      overflow-x: hidden;
    }
  }
</style>
