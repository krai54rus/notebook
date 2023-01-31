import { defineStore } from 'pinia'
import { INoteItem } from '@/entities/notes/NoteTypes'
import api, { errorHandler } from '@/api'

export type RootState = {
  notes: INoteItem[]
}

export const useNoteStore = defineStore('note', {
  state: () =>
    ({
      notes: [],
    } as RootState),

  actions: {
    async loadNotes() {
      try {
        const result: any = await api('/testapi/notes.json', 'GET')

        this.notes = result
      } catch (e: any) {
        errorHandler(e)
      }
    },
  },
})
