import type { Dispatch, SetStateAction } from 'react';
import type { Image } from 'Types/Redux/Images';
import type { IData } from 'Types/BaseQuery';

interface IModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  images: IData<Image>[];
  descriptions: string;
}
