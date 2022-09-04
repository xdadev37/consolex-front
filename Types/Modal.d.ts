import type { Dispatch, SetStateAction } from 'react';

interface IModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
