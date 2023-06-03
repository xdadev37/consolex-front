import type { IOffers } from 'Types/Redux/Shop'

interface ISwiper {
  data: IOffers[]
  shopImagesHandler: (id: number, cardId: number) => () => Promise<void>
}
