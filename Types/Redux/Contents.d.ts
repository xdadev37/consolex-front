import type { IImage, IId } from 'Types/Redux/Images'

interface IAttributes {
  title: string
  ps: string
  createdAt: Date
  updatedAt: Date
  image: IImage
  images: Record<'data', IId>
}

interface IContents extends IId {
  attributes: IAttributes
}
