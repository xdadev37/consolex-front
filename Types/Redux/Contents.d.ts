import type { Image } from 'Types/Redux/Images';

interface IContents {
  title: string;
  image: { data: { attributes: Image } };
  ps: string;
  description: string;
  contentsImages: {
    data: { id: string; attributes: { Descriptions: string } };
  };
}
