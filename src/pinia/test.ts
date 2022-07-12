import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import * as faker from 'faker'
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
    id: uuidv4(),
    quantity: Math.random(),
    name: faker.lorem.word(),
    description: faker.lorem.words(),
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
