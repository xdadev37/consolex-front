import type { Image } from 'Types/Redux/Images';

interface IShop {
  title: string;
  image: { data: { attributes: Image } };
  ps?: string;
  price?: number;
  shopImages?: { data: { id: string; attributes: { Descriptions: string } } };
}
