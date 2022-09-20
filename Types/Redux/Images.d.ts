interface Image {
  name: string;
  formats: { small: { url: string } };
}

interface IDescriptions {
  descriptions: string;
}

export interface IContentsImages extends IDescriptions {
  contentsImages: Image[];
}
