import type { Dispatch, SetStateAction } from 'react';

interface IImage {
  src: string;
  alt: string;
}

interface IModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  images: IImage[];
}
