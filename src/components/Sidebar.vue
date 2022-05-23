<script setup lang="ts">
  const fields = [
    {
      title: 'Главная',
      path: 'main',
      icon: '',
    },
    {
      title: 'Заметки',
      path: 'notes',
      icon: '',
    },
    {
      title: 'ToDo',
      path: 'todo',
      icon: '',
    },
    {
      title: 'Конструктор',
      path: 'constructor',
      icon: '',
    },
    {
      title: 'Настройки',
      path: 'settings',
      icon: '',
    },
  ]
</script>

<template>
  <div class="menu">
    <div class="menu__top">
      <div class="menu__user">
        <div class="menu__user-avatar">
          <img src="avatar.png" />
        </div>
        <div class="menu__user-name">
          <span>Евгений Быстрый</span>
        </div>
      </div>
    </div>
    <div class="menu-bottom menu__list">
      <div class="menu__item" v-for="(item, index) in fields" :key="index">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $component: menu;

  .#{$component} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 100%;
    flex-grow: 1;
    background-color: #1a1a1a;

    &__list {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
