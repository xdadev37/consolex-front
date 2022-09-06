export interface IContents {
  title: string;
  image: {
    data: { attributes: { name: string; formats: { small: { url: string } } } };
  };
  ps: string;
  description: string;
  contentsImages: { data: { id: string } };
}
