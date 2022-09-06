interface Image {
  attributes: { name: string; formats: { small: { url: string } } };
}

export interface IImages {
  attributes: { ContentsImages: { data: Image[] } };
}
