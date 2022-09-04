import { memo, useState, useMemo } from 'react';
import { Grid } from '@mui/material';
import lazy from 'next/dynamic';
import { useShopQuery } from 'api/shop';
import { useContentsQuery } from 'api/contents';
import type { NextPage } from 'next';
import type { Modes } from 'Types/Toggler';

/** @module lazy @constant import */
const Toggler = lazy(() => import('Components/MainPage/Items/Toggler'));
const Card = lazy(() => import('Modules/Card'));

const MainPage: NextPage = () => {
  const [mode, setMode] = useState<Modes>('shop');
  const shopContents = useShopQuery(undefined, { skip: mode !== 'shop' });
  const contents = useContentsQuery(undefined, { skip: mode !== 'contents' });
  const cards = useMemo(() => {
    switch (mode) {
      case 'shop':
        return shopContents.data?.data.map((card, index) => (
          <Card
            key={index}
            backgroundColor="#ffd401"
            header={{ title: card.attributes.title }}
            media={{
              url: card.attributes.image.data.attributes.formats.small.url,
              alt: '',
            }}
          />
        ));
      case 'contents':
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <Grid container>
      <Grid container justifyContent="flex-start" id="header">
        <Toggler {...{ mode, setMode }} />
      </Grid>
    </Grid>
  );
};

export default memo(MainPage);
