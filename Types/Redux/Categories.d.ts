export interface IAttributes {
  value: string
  key: string
  createdAt: Date
  updatedAt: Date
}

interface IMenu_2 extends IAttributes {
  menu_1: Record<'data', ICategories<IAttributes>[]>
}

interface IMenu_3 extends IAttributes {
  menu_2: Record<'data', ICategories<IMenu_2>[]>
}  

interface ICategories<Attributes> {
  id: number
  attributes: Attributes
}
