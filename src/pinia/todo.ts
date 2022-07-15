import { defineStore } from 'pinia'
import api, { errorHandler } from '@/api'

interface IToDoItem {
  id: string
  title: string
  description?: string
}

interface IColumn {
  id: string
  title: string
  items: IToDoItem[]
  dateCreate: Date
}

export type RootState = {
  columns: IColumn[]
}

export const useTestStore = defineStore('toDo', {
  state: () =>
    ({
      columns: [],
    } as RootState),

  actions: {
    async loadColumns() {
      try {
        const result: any = await api('../testapi/todo.json', 'GET')

        console.log('columns ', result)

        this.columns = result
      } catch (e: any) {
        errorHandler(e)
      }
    },
  },
})
