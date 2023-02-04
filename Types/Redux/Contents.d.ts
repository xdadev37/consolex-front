import type { IImage } from 'Types/Redux/Images'

interface IAttributes {
  title: string
  ps: string
  createdAt: Date
  updatedAt: Date
  image: IImage
}

interface IContents {
  id: number
  attributes: IAttributes
}
