import type { IShop } from 'Types/Redux/Shop'

interface ISwiper {
  data: IShop[]
  shopImagesHandler: (id: number, cardId: number) => () => Promise<void>
}
