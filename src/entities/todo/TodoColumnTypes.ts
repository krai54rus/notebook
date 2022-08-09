export interface ITodoItem {
  id: string
  title: string
  description?: string
}

export interface ITodoColumn {
  id: string|number
  title: string
  items: ITodoItem[]
  dateCreate: string
}
