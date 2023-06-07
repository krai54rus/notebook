<script lang="ts" setup>
  import ToDoTableItem from './todo/ToDoTableItem.vue'
  import { computed } from 'vue'
  import { useTodoPageStore } from '@/pinia/todopage'

  const store = useTodoPageStore()

  const data = computed(() => store.items)
  store.loaditems()
</script>
<template>
  <div class="n-wp-100 n-hp-100" :class="$style['todo']">
    <div class="n-wp-100 n-hp-100" :class="$style['todo-wrapper']">
      <nb-toolbar title="ToDo"></nb-toolbar>
      <div
        class="n-wp-100 n-py-16 n-flex n-justify-center n-alignt-center"
        :class="$style['todo__list']"
      >
        <ToDoTableItem
          v-for="(item, index) in data"
          :key="index"
          title="ToDo"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: todo;

  .#{$component} {
    &__list {
      max-width: 1040px;
      flex-wrap: wrap;
      flex-grow: 1;
      gap: 10px;
      margin: auto;
    }
  }
</style>
