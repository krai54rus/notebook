<script lang="ts" setup>
  import NoteItem from '@/components/note/NoteItem.vue'
  import { ref, computed, Ref } from 'vue'
  import { useNoteStore } from '@/pinia/notes'
  import { INoteItem } from '@/entities/notes/NoteTypes'

  const store = useNoteStore()
  const notes = computed(() => store.notes)
  const newNote = ref('')
  const isModalOpen = ref(false)
  const itemInfo: Ref<null | INoteItem> = ref(null)
  store.loadNotes()

  const handleOpenModal = (item: INoteItem) => {
    itemInfo.value = item
    isModalOpen.value = true
  }
</script>
<template>
  <div class="n-wp-100 n-hp-100" :class="$style['notes']">
    <div class="n-wp-100 n-hp-100" :class="$style['notes__wrapper']">
      <nb-toolbar title="Notes">
        <template #content>
          <div class="n-flex n-flex-center n-wp-100">
            <nb-input
              v-model="newNote"
              :class="$style['notes__input']"
              placeholder="Заметка..."
              type="solo"
              size="small"
              :no-focus="true"
            ></nb-input>
          </div>
        </template>
      </nb-toolbar>
      <div
        class="n-wp-100 n-py-16 n-flex n-flex-start n-alignt-center"
        :class="$style['notes__list']"
      >
        <NoteItem
          v-for="(item, index) in notes"
          :key="index"
          :item="item"
          @click="handleOpenModal(item)"
        />
      </div>
    </div>
    <ModalTodoItem
      v-if="isModalOpen"
      :item="itemInfo"
      @close="isModalOpen = false"
    ></ModalTodoItem>
  </div>
</template>

<style lang="scss" module>
  $component: notes;

  .#{$component} {
    background-color: #f2f1f6;
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
