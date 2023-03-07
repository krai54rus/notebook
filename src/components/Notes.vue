<script lang="ts" setup>
  import NoteItem from './note/NoteItem.vue'
  import { ref, computed } from 'vue'
  import { useNoteStore } from '@/pinia/notes'

  const store = useNoteStore()
  const notes = computed(() => store.notes)
  const newNote = ref('')
  store.loadNotes()
</script>
<template>
  <div class="n-wp-100 n-hp-100" :class="$style['notes']">
    <div class="n-wp-100 n-hp-100" :class="$style['notes__wrapper']">
      <nb-toolbar title="ToDo">
        <template #content>
          <div class="n-flex n-flex-center n-wp-100">
            <nb-input
              :class="$style['notes__input']"
              placeholder="Заметка..."
              type="solo"
              size="small"
              :no-focus="true"
              :value="newNote"
            ></nb-input>
          </div>
        </template>
      </nb-toolbar>
      <div
        class="n-wp-100 n-py-16 n-flex n-justify-center n-alignt-center"
        :class="$style['notes__list']"
      >
        <NoteItem v-for="(item, index) in notes" :key="index" :item="item" />
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

    &__input {
      max-width: 400px;
    }
  }
</style>
