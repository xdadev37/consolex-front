import type { Dispatch, SetStateAction } from 'react';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ICard {
  header: {
    title: string;
    subheader?: string;
    actions?: (
      | {
          onClick: () => void;
          label: string;
          icon: IconDefinition;
        }
      | false
    )[];
  };
  backgroundColor: string;
  children?: JSX.Element | JSX.Element[];
  cardActions?: JSX.Element | JSX.Element[];
  isDeleted?: boolean;
  media: { url?: string; alt: string };
  collapse?: {
    open: { value: boolean; setValue: Dispatch<SetStateAction<boolean>> };
    backgroundColor: string;
    children: JSX.Element | JSX.Element[];
  };
  onClick?: () => void;
}
