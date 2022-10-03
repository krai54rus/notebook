export interface ITodoItem {
  id: string
  title: string
  description: string
  // placeholder?: boolean
  column: number
  dateCreate: string
}

export interface ITodoColumn {
  id: string | number
  title: string
  items: ITodoItem[]
  dateCreate: string
}
