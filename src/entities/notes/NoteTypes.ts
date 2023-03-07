export interface INoteItem {
  id: string | number
  title: string
  description: string
  color: string
  dateCreate: string
}

interface IItemA {
  id: number
  name: string
}

interface IItemB {
  id: number
  name: string
  link: string
}

interface IItemC {
  id: number
  name: string
  birth: string
}

type TItemGeneric = IItemA | IItemB | IItemC
export interface IComboItem<T = TItemGeneric> {
  page: number
  items: T[]
}
