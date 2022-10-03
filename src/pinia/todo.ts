import { defineStore } from 'pinia'
import { ITodoColumn } from '@/entities/todo/TodoColumnTypes'
import api, { errorHandler } from '@/api'

export type RootState = {
  columns: ITodoColumn[]
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
