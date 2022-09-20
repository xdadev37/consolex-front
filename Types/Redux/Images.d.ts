import type { IData, IDataById } from 'Types/BaseQuery';

interface Image {
  name: string;
  formats: { small: { url: string } };
}

interface IImages {
  ContentsImages: Image[];
}
