<script setup lang="ts">
  import { computed } from 'vue'
  import mainSvg from '@/assets/icons/main.svg?raw'
  import notesSvg from '@/assets/icons/notes.svg?raw'
  import settingsSvg from '@/assets/icons/settings.svg?raw'
  import todoSvg from '@/assets/icons/todo.svg?raw'
  import constructorSvg from '@/assets/icons/constructor.svg?raw'
  import arrowDownSvg from '@/assets/icons/arrow_down.svg?raw'
  import plusSvg from '@/assets/icons/plus.svg?raw'

  const iconFunc = (name: string): any => {
    switch (name) {
      case 'main':
        return mainSvg as string
      case 'notes':
        return notesSvg as string
      case 'todo':
        return todoSvg as string
      case 'constructor':
        return constructorSvg as string
      case 'settings':
        return settingsSvg as string

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
  <div class="sidebar">
    <div class="menu">
      <div class="menu__info">
        <div class="menu__user">
          <div class="menu__user-avatar">
            <img src="../assets/avatar.png" />
          </div>
          <div class="menu__user-name">
            <span>Евгений Быстрый</span>
          </div>
        </div>
        <div class="menu__create">
          <div class="menu__create-button">
            <div class="menu__create-left">
              <div
                class="menu__create-icon menu__create-plus"
                v-html="plusSvg"
              ></div>
              <div>Создать</div>
            </div>
            <div class="menu__create-right">
              <div
                class="menu__create-icon menu__create-arrow"
                v-html="arrowDownSvg"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-links menu__list">
        <div class="menu__item" v-for="(item, index) in fields" :key="index">
          <router-link class="menu__item-link" :to="item.path">
            <div class="menu__item-icon" v-html="iconFunc(item.icon)"></div>
            <div class="menu__item-text">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $component: sidebar;

  .#{$component} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 240px;
    height: 100%;
    flex-grow: 1;
    background-color: #1a1a1a;
    .menu {
      &__user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        &-avatar {
          width: 28px;
          height: 28px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        &-name {
          color: var(--color-white);
        }
      }

      &__info {
        padding-left: 12px;
        padding-right: 12px;
      }

      &__create {
        background-color: var(--evernote-green);
        border-radius: 20px;
        padding-left: 12px;
        padding-right: 12px;

        &-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        &-left {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--color-white);
        }

        &-icon {
          fill: var(--color-white);
        }
      }

      &__list {
        width: 100%;
      }

      &__item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 4px 4px 4px 18px;

        &-link {
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--color-white);
        }

        &-icon {
          fill: var(--color-gray-40);
          stroke: var(--color-gray-40);
        }
      }
    }
  }
</style>
