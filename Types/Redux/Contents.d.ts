import type { Image } from 'Types/Redux/Images';

interface IContents {
  id: number;
  title: string;
  image: Image;
  ps: string;
  description: string;
  contentsImages?: { Descriptions: string };
}
