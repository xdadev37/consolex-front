import type { Image } from 'Types/Redux/Images'

interface IShop {
  id: number
  title: string
  image: Image
  ps?: string
  price?: number
  imagesId?: number
}

interface IParams {
  'filters[menu_1][key][$eq]': string
}
