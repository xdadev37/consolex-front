export interface IUrl {
  url: string
}

interface Image {
  name: string
  formats: { small: IUrl; medium: IUrl; large: IUrl; thumbnail: IUrl }
}

interface IImages {
  descriptions: string
  images: Image[]
}
