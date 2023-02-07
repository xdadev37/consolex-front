interface IMedium {
  url: string
  name: string
}

interface IFormats {
  medium: IMedium
}

export interface IImage {
  formats: IFormats
}

interface IId {
  id: number
}
interface IAttributes extends IId {
  attributes: IImage
}

export interface IImages {
  descriptions: string
  images: Record<'data', IAttributes[]>
}
