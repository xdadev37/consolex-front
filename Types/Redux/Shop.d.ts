import type { IAttributes as IImage, IId } from 'Types/Redux/Images.d'

interface IAttributes {
  title: string
  ps: string
  price: number
  createdAt: Date
  updatedAt: Date
  image: Record<'data', IImage>
  images: Record<'data', IId>
}

interface IShop extends IId {
  attributes: IAttributes
}

interface IParams {
  'filters[menu_1s][key][$eq]'?: string
}
