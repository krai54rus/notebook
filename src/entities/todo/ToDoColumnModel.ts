const empty = (): IToDoColumn => ({
  id: '',
  title: '',
  items: [],
  dateCreate: '',
})

export default class ToDoColumnModel {
  static create(): IToDoColumn {
    return empty()
  }
}
