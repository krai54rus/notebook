<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'

  interface Props {
    item: any
  }

  const props = withDefaults(defineProps<Props>(), {
    item: {},
  })

  const isEdit = ref(false)
  const emit = defineEmits(['click'])

  const editClick = () => {
    console.log('edit click')
    isEdit.value = true
  }
</script>

<template>
  <div class="n-p-4 n-mb-8 n-flex n-justify-space-between n-radius--full-sm">
    <div v-if="!isEdit" class="n-flex">
      <div>
        {{ item.placeholder ? '' : item.title }}
      </div>
      <div
        class="n-icon_sm"
        :class="$style['column-item__icon-edit']"
        @click="editClick()"
      >
        <nb-icon name="edit" />
      </div>
    </div>
    <div v-else class="">
      <nb-textarea :value="item.title"></nb-textarea>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: column-item;

  .#{$component} {
    background-color: var(--color-white);
    box-shadow: 0 1px 0 #091e4240;
    cursor: pointer;
    width: 284px;
    position: relative;
    z-index: 10;

    &:hover {
      background-color: var(--color-white-hovered);
    }

    &_placeholder {
      background-color: var(--gainsboro);
      height: 24px;
    }

    &__icon-edit {
      :hover {
        background-color: var(--color-gray-main);
      }
    }
  }
</style>
