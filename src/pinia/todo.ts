import { defineStore } from 'pinia'
import api, { errorHandler } from '@/api'

export type RootState = {
  columns: IToDoColumn[]
}

export const useToDoStore = defineStore('toDo', {
  state: () =>
    ({
      columns: [],
    } as RootState),

  actions: {
    async loadColumns() {
      try {
        const result: any = await api('/testapi/todo.json', 'GET')

        this.columns = result
      } catch (e: any) {
        errorHandler(e)
      }
    },
  },
})
