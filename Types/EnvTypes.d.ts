import type { SxProps, Theme } from '@mui/system';
import type { Location } from 'react-router-dom';

interface IKeyValue<Key> {
  key: Key;
  value: string;
}

type MuiClasses<Keys extends string> = Record<Keys, SxProps<Theme>>;
type Children = Record<'children', JSX.Element | JSX.Element[] | string>;

interface IUseLocation<State> extends Location {
  state: State;
}

interface IMutationRes {
  isSuccess: boolean;
  statusCode: number;
  message: string;
}

interface IIndex {
  index: number;
}
