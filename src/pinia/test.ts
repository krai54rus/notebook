import { defineStore } from 'pinia'
import api, { errorHandler } from '@/api'

interface Item {
  id: string
  name: string
  description?: string
  quantity: number
  createdAt: Date
  deletedAt?: Date
}

function generateFakeData(): Item {
  return {
    id: 'qwe',
    quantity: Math.random(),
    name: 'test',
    description: 'descr',
    createdAt: new Date(),
  }
}

export type RootState = {
  items: any[]
  // items: Item[]
}

export const useTestStore = defineStore({
  id: 'testStore',
  state: () =>
    ({
      items: [],
    } as RootState),

  actions: {
    async loaditems() {
      try {
        // commit('setLoading', true)

        const result: any = await api(
          'https://jsonplaceholder.typicode.com/users',
          'GET'
        )

        this.items = result
      } catch (e: any) {
        errorHandler(e)
      } finally {
        // commit('setLoading', false)
      }
    },

    createNewItem(item: Item) {
      if (!item) return

      this.items.push(item)
    },

    updateItem(id: string, payload: Item) {
      if (!id || !payload) return

      const index = this.findIndexById(id)

      if (index !== -1) {
        this.items[index] = generateFakeData()
      }
    },

    deleteItem(id: string) {
      const index = this.findIndexById(id)

      if (index === -1) return

      this.items.splice(index, 1)
    },

    findIndexById(id: string) {
      return this.items.findIndex(item => item.id === id)
    },
  },
})
