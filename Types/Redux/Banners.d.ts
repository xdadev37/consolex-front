import type { IAttributes as IImage, IId } from 'Types/Redux/Images'

interface IAttributes {
  link: string
  ps: string
  image: Record<'data', IImage>
}

interface IBanners extends IId {
  attributes: IAttributes
}
