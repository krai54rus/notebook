import { ITodoColumn } from './TodoColumnTypes'

const empty = (): ITodoColumn => {
  return {
    id: '',
    title: '',
    items: [],
    dateCreate: '',
  }
}

export default class TodoColumnModel {
  static create(): ITodoColumn {
    return empty()
  }
}
