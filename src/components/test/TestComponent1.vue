<template>
  <div class="virtual-list" ref="container" @scroll="handleScroll">
    <div class="virtual-list__inner" :style="{ height: totalHeight + 'px' }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list__item"
        :style="{ transform: `translateY(${item.offset}px)` }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
  // const props = withDefaults(defineProps<Props>(), {
  //   text: 'Тестовый компонент',
  //   id: '123',
  //   items: () =>
  //     Array.from({ length: 100 }).map<VisibleItem>(
  //       (item, index) =>
  //         ({
  //           id: `${index}`,
  //           content: `name${index}`,
  //         } as VisibleItem)
  //     ),
  // })
  export default defineComponent({
    props: {
      items: {
        type: Array,
        required: true,
        default: () =>
          Array.from({ length: 100 }).map((item, index) => ({
            id: `${index}`,
            content: `name${index}`,
          })),
      },
      itemHeight: {
        type: Number,
        default: 50,
      },
    },
    setup(props) {
      const container = ref(null)
      const scrollTop = ref(0)
      const containerHeight = ref(0)

      const totalHeight = computed(() => props.items.length * props.itemHeight)

      const visibleCount = computed(() => {
        return Math.ceil(containerHeight.value / props.itemHeight)
      })

      const startIndex = computed(() => {
        return Math.floor(scrollTop.value / props.itemHeight)
      })

      const visibleItems = computed(() => {
        const endIndex = startIndex.value + visibleCount.value + 5 // Небольшой буфер
        return props.items
          .slice(startIndex.value, endIndex)
          .map((item, index) => ({
            ...item,
            offset: (startIndex.value + index) * props.itemHeight,
          }))
      })

      const handleScroll = () => {
        if (container.value) {
          scrollTop.value = container.value.scrollTop
        }
      }

      const updateContainerHeight = () => {
        if (container.value) {
          containerHeight.value = container.value.clientHeight
        }
      }

      onMounted(() => {
        updateContainerHeight()
        window.addEventListener('resize', updateContainerHeight)
      })

      onUnmounted(() => {
        window.removeEventListener('resize', updateContainerHeight)
      })

      return {
        container,
        totalHeight,
        visibleItems,
        handleScroll,
      }
    },
  })
</script>

<style scoped>
  .virtual-list {
    overflow-y: auto;
    height: 100%;
  }

  .virtual-list__inner {
    position: relative;
  }

  .virtual-list__item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
  }
</style>
