<script setup lang="ts">
  import { computed } from 'vue'
  import mainSvg from '@/assests/icons/main.svg'
  import notesSvg from '@/assests/icons/notes.svg'
  import settingsSvg from '@/assests/icons/main.svg'
  import todoSvg from '@/assests/icons/todo.svg'
  import constructorSvg from '@/assests/icons/constructor.svg'

  const iconFunc = (name): string => {
    switch (name) {
      case 'main':
        return mainSvg
        break
      case 'notes':
        return notesSvg
        break
      case 'todo':
        return todoSvg
        break
      case 'constructor':
        return constructorSvg
        break
      case 'settings':
        return settingsSvg
        break

      default:
        break
    }
  }

  const fields = [
    {
      title: 'Главная',
      path: 'main',
      icon: 'main',
    },
    {
      title: 'Заметки',
      path: 'notes',
      icon: 'notes',
    },
    {
      title: 'ToDo',
      path: 'todo',
      icon: 'todo',
    },
    {
      title: 'Конструктор',
      path: 'constructor',
      icon: 'constructor',
    },
    {
      title: 'Настройки',
      path: 'settings',
      icon: 'settings',
    },
  ]
</script>

<template>
  <div class="sidebar sidebar-menu">
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
        <router-link :to="item.path">
          <img class="menu__item-img" :src="item.icon" />
          <div v-html="mainSvg"></div>
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $component: sidebar;

  .#{$component} {
    &-menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 240px;
      height: 100%;
      flex-grow: 1;
      background-color: #1a1a1a;

      .menu {
        &__list {
          width: 100%;
        }

        &__item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 4px 4px 4px 8px;

          &-img {
            fill: var(--color-gray-40);
          }

          a {
            color: white;
          }
        }
      }
    }
  }
</style>
