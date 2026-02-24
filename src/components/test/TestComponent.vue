<script setup lang="ts">
  import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref } from 'vue'

  interface Props {
    text?: string
    name?: string
    id: string
    items: VisibleItem[]
  }

  interface VisibleItem {
    id: string
    content: string
    offset?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    text: 'Тестовый компонент',
    id: '123',
    items: () =>
      Array.from({ length: 100 }).map<VisibleItem>(
        (item, index) =>
          ({
            id: `${index}`,
            content: `name${index}`,
          } as VisibleItem)
      ),
  })

  const itemHeight = 50

  const container: Ref<HTMLElement | null> = ref(null)
  const inner: Ref<HTMLElement | null> = ref(null)
  const scrollTop: Ref<number> = ref(0)
  const containerHeight: Ref<number> = ref(0)
  const totalHeight = computed(() => props.items.length * 50)
  const startEl = computed(() => Math.floor(scrollTop.value / itemHeight))
  const endEl = computed(() =>
    Math.floor(startEl.value + containerHeight.value / itemHeight)
  )
  const visibleItems: ComputedRef<VisibleItem[]> = computed(() => {
    return props.items
      .slice(startEl.value, endEl.value + 2)
      .map((item, index) => ({
        ...item,
        offset: itemHeight * (index + startEl.value),
      }))
  })

  const handleScroll = (e: any) => {
    if (container?.value) {
      scrollTop.value = container.value.scrollTop
      // scrollTop.value = inner.value.offsetTop
      console.log('sc ', container?.value.getClientRects())
    }
  }

  onMounted(() => {})

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
</script>
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

<style lang="scss" scoped>
  .virtual-list {
    overflow-y: auto;
    height: 100%;
    width: 100%;
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
