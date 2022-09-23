import { memo, Fragment } from 'react';
import { Typography } from '@mui/material';
import lazy from 'next/dynamic';
import { useContentsQuery } from 'api/contents';
import type { NextPage } from 'next';
import type { IContentsImagesHandler } from 'Types/MainPage';

/** @module lazy @constant import */
const Card = lazy(() => import('Modules/Card'));
const Loading = lazy(() => import('Modules/Loading'));

const Contents: NextPage<IContentsImagesHandler> = ({
  contentsImagesHandler,
}) => {
  const contents = useContentsQuery(undefined);

  return (
    <Fragment>
      {contents.data?.map((card, index) => (
        <Card
          key={index}
          onClick={
            card.imagesId
              ? () => contentsImagesHandler(card.imagesId || 0)
              : undefined
          }
          backgroundColor="#ffd401"
          header={{ title: card.title }}
          media={{
            url: card.image.formats.small.url,
            alt: card.image.name,
          }}
        >
          <Typography>{card.ps}</Typography>
        </Card>
      ))}
      <Loading open={contents.isFetching} />
    </Fragment>
  );
};

export default memo(Contents);
