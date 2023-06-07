import { defineStore } from 'pinia'
import api, { errorHandler } from '@/api'

interface ITable {
  id: string
  title: string
  dateCreate: Date
}

// function generateFakeData(): Item {
//   return {
//     id: uuidv4(),
//     quantity: Math.random(),
//     name: faker.lorem.word(),
//     description: faker.lorem.words(),
//     createdAt: new Date(),
//   }
// }

export type RootState = {
  tables: ITable[]
}

export const useTestStore = defineStore('tables', {
  state: () =>
    ({
      tables: [],
    } as RootState),

  actions: {
    async loadTables() {
      try {
        const result: any = await api('../testapi/tables.json', 'GET')

        console.log('columns ', result)

        this.tables = result
      } catch (e: any) {
        errorHandler(e)
      }
    },
  },
})
