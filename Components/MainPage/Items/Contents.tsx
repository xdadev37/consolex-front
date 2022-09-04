import { memo } from 'react';
import {} from '@mui/material';
import type { NextPage } from 'next';
import lazy from 'next/dynamic';

/** @module lazy @constant import */
const Card = lazy(() => import('Modules/Card'));

const Contents: NextPage = () => {
  //   return <Card />;
  return <></>;
};

export default memo(Contents);
