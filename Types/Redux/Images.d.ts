interface IMedium {
  url: string
  name: string
  ext: string
}

interface IFormats {
  medium: IMedium
}

export interface IImage {
  name: string
  formats: IFormats
}
