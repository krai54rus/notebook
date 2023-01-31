<script lang="ts" setup>
  import NoteItem from './note/NoteItem.vue'
  import { computed } from 'vue'
  import { useNoteStore } from '@/pinia/notes'

  const store = useNoteStore()
  const notes = computed(() => store.notes)
  store.loadNotes()
</script>
<template>
  <div class="n-wp-100 n-hp-100" :class="$style['notes']">
    <div class="n-wp-100 n-hp-100" :class="$style['notes-wrapper']">
      <nb-toolbar title="ToDo"></nb-toolbar>
      <div
        class="n-wp-100 n-py-16 n-flex n-justify-center n-alignt-center"
        :class="$style['notes__list']"
      >
        <NoteItem
          v-for="(item, index) in notes"
          :key="index"
          title="ToDo"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: notes;

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
