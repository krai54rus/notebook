import { defineStore } from 'pinia'
import { ITodoColumn } from '@/entities/todo/TodoColumnTypes'
import api, { errorHandler } from '@/api'

export type RootState = {
  items: any[]
  loading: boolean
}

export const useTodoPageStore = defineStore('todoPage', {
  state: () =>
    ({
      items: [] as any,
      loading: false,
    } as RootState),

  actions: {
    async loaditems() {
      try {
        this.loading = true

        const result: any = await api(
          'https://jsonplaceholder.typicode.com/users',
          'GET'
        )

        console.log(result)

        this.items = result
      } catch (e: any) {
        errorHandler(e)
      } finally {
        this.loading = false
      }
    },
  },
})
