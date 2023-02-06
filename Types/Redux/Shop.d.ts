import type { IImage, IId } from 'Types/Redux/Images'

interface IAttributes {
  title: string
  ps: string
  price: number
  createdAt: Date
  updatedAt: Date
  image: IImage
  images: Record<'data', IId>
}

interface IShop extends IId {
  attributes: IAttributes
}

export interface IParams {
  'filters[menu_1][key][$eq]': string
}
