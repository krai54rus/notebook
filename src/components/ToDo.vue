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
  <div :class="[$style['todo']">
    <div :class="[$style['todo-wrapper']">
      <Toolbar></Toolbar>
      <div :class="[$style['todo__list']">
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

<style lang="scss" module>
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
