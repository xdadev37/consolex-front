interface IUrl {
  url: string
}

interface Image {
  name: string
  formats: { small: IUrl; medium: IUrl; large: IUrl; thumbnail: IUrl }
}

interface IDescriptions {
  descriptions: string
}

export interface IContentsImages extends IDescriptions {
  contentsImages: Image[]
}
