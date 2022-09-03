export interface IShop {
  title: string;
  image: { data: { attributes: { formats: { small: { url: string } } } } };
  ps: string;
  price: number;
}
