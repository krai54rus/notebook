<script lang="ts" setup>
  import ToDoTableItem from './todo/ToDoTableItem.vue'
  import Toolbar from '@/components/generic/Toolbar.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>
<template>
  <div class="n-wp-100 n-hp-100" :class="$style['todo']">
    <div class="n-wp-100 n-hp-100" :class="$style['todo-wrapper']">
      <Toolbar title="ToDo"></Toolbar>
      <div class="n-wp-100" :class="$style['todo__list']">
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
