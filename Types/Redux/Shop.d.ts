import type { IImage } from 'Types/Redux/Images'

interface IAttributes {
  title: string
  ps: string
  price: number
  createdAt: Date
  updatedAt: Date
  image: IImage
}

interface IShop {
  id: number
  attributes: IAttributes
}

interface IParams {
  'filters[menu_1][key][$eq]': string
}
