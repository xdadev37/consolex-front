import type { IAttributes as IImage, IId } from 'Types/Redux/Images.d'
import type { IParams } from 'Types/Redux/Shop.d'

interface IAttributes {
  value: string
  key: string
  createdAt: Date
  updatedAt: Date
  image: Record<'data', IImage>
}

interface ICategories<Attributes> {
  id: number
  attributes: Attributes
}

interface IMenu_2 extends IAttributes {
  menu_1s: Record<'data', ICategories<IAttributes>[]>
}

interface IMenu_3 extends IAttributes {
  menu_2s: Record<'data', ICategories<IMenu_2>[]>
}

interface ISlicer {
  params: IParams | null
  mainPage: boolean
}
