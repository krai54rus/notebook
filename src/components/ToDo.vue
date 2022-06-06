<script lang="ts" setup>
  import ToDoTable from './todo/ToDoTable.vue'
  import Toolbar from '@/components/generic/Toolbar.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>
<template>
  <div class="todo">
    <div class="todo-wrapper">
      <Toolbar></Toolbar>
      <div class="todo__list">
        <ToDoTable
          v-for="(item, index) in data"
          :key="index"
          title="ToDo"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $component: todo;

  .#{$component} {
    width: 100%;
    height: 100%;

    &-wrapper {
      width: 100%;
      height: 100%;
    }

    &__list {
      width: 100%;
      max-width: 1040px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
      gap: 10px;
      margin: auto;
    }
  }
</style>
