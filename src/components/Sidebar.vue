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
      path: '/',
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
  <div :class="$style['sidebar']">
    <div :class="$style['menu']">
      <div :class="$style['menu__info']">
        <div :class="[$style['menu__info_item'], $style['menu__user']]">
          <div :class="$style['menu__user-avatar']">
            <img src="../assets/avatar.png" />
          </div>
          <div :class="$style['menu__user-name']">
            <span>Евгений Быстрый</span>
          </div>
        </div>
        <div :class="[$style['menu__info_item'], $style['menu__create']]">
          <div :class="$style['menu__create-button']">
            <div :class="$style['menu__create-left']">
              <div
                :class="[
                  $style['menu__create-icon'],
                  $style['menu__create-plus'],
                ]"
                v-html="plusSvg"
              ></div>
              <div>Создать</div>
            </div>
            <div :class="$style['menu__create-right']">
              <div
                :class="[$style['menu__create-icon'], ['menu__create-arrow']]"
                v-html="arrowDownSvg"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div :class="[$style['menu-links'], $style['menu__list']]">
        <div
          :class="$style['menu__item']"
          v-for="(item, index) in fields"
          :key="index"
        >
          <router-link :class="$style['menu__item-link']" :to="item.path">
            <div
              :class="$style['menu__item-icon']"
              v-html="iconFunc(item.icon)"
            ></div>
            <div :class="$style['menu__item-text']">
              <span>{{ item.title }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
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
      width: 100%;

      &__user {
        display: flex;
        align-items: center;

        &-avatar {
          width: 28px;
          height: 28px;
          margin-right: 8px;

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
        margin-bottom: 10px;

        &_item {
          margin-top: 10px;
        }
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

        &-link {
          display: flex;
          align-items: center;
          padding: 4px 4px 4px 18px;
          width: 100%;
          color: var(--color-white);
        }

        &-icon {
          fill: var(--color-gray-40);
          stroke: var(--color-gray-40);
        }

        &:hover {
          background-color: var(--gray25);
        }
      }
    }
  }
</style>
