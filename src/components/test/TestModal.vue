<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Transition from 'vue'

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: false,
        default: '123',
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const isModal = ref(false)
      const close = () => {
        emit('close')
      }

      return { isModal, close }
    },
  })

  // const emit = defineEmits<{
  //   (e: 'close'): void
  // }>()
</script>
<template>
  <Transition name="testm">
    <!-- <Teleport to="body"> -->
    <div>
      <nb-button @click="isModal = !isModal">modalClick</nb-button>
      <div v-if="isModal" class="test-modal">
        <div class="test-modal-overlay" @click="close()">
          <div class="test-modal-content">
            <div class="test-modal-text">MODAL</div>
          </div>
        </div>
      </div>
    </div>
    <!-- </Teleport> -->
  </Transition>
</template>

<style lang="scss">
  // enterFromClass?: string
  // enterActiveClass?: string
  // enterToClass?: string
  // appearFromClass?: string
  // appearActiveClass?: string
  // appearToClass?: string
  // leaveFromClass?: string
  // leaveActiveClass?: string
  // leaveToClass?: string
  .testm {
    &--enter-active,
    &--leave-active {
      transition: opacity 2s ease;
    }

    &--enter-from,
    &--leave-to {
      opacity: 0;
    }
    transition: ease;
    // &-enter-from,
    // .appear-from {
    //   opacity: 0;
    // }
    // &-enter-to,
    // .appear-to {
    //   opacity: 0;
    // }
  }
  .test-modal {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &-overlay {
      background: oklch(58.971% 0.00007 271.152 / 0.409);
      z-index: 1;
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-content {
      z-index: 2;
    }

    &-text {
      width: 300px;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 10px;
    }
  }
</style>
