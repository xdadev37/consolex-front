import type { Image } from 'Types/Redux/Images';

interface IShop {
  id: number;
  title: string;
  image: Image;
  ps?: string;
  price?: number;
  shopImages?: { Descriptions: string };
}
