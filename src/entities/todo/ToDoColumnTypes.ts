interface IToDoItem {
  id: string
  title: string
  description?: string
}

interface IToDoColumn {
  id: string
  title: string
  items: IToDoItem[]
  dateCreate: string
}
