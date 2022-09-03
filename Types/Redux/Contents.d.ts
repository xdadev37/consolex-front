export interface IContents {
  title: string;
  image: { data: { attributes: { formats: { small: { url: string } } } } };
  ps: string;
  description: string;
}
