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

interface IFormat {
  formats: IAttributes
}

interface IAttributes extends IId {
  attributes: IFormat
}

export interface IImages {
  descriptions: string
  images: Record<'data', IAttributes[]>
}
