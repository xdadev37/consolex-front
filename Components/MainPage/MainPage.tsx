import { memo, useState, useMemo } from 'react';
import { Grid } from '@mui/material';
import lazy from 'next/dynamic';
import { useShopQuery } from 'api/shop';
import { useContentsQuery } from 'api/contents';
import { useLazyImagesQuery } from 'api/images';
import { useLazyShopImagesQuery } from 'api/shopImages';
import remarkParser from 'Constants/remarkParser';
import type { NextPage } from 'next';
import type { Modes } from 'Types/Toggler';

/** @module lazy @constant import */
const Toggler = lazy(() => import('Components/MainPage/Items/Toggler'));
const Card = lazy(() => import('Modules/Card'));
const Modal = lazy(() => import('Modules/Modal'));

const MainPage: NextPage = () => {
  const [mode, setMode] = useState<Modes>('shop');
  const [modal, setModal] = useState(false);
  const [modalDescriptions, setModalDescriptions] = useState('');
  const shopContents = useShopQuery(undefined, { skip: mode !== 'shop' });
  const contents = useContentsQuery(undefined, { skip: mode !== 'contents' });
  const [getImages, gotImages] = useLazyImagesQuery();
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery();
  const contentsImagesHandler = (id: number, descriptions: string) =>
    (mode === 'shop' ? getShopImages : getImages)(id).then(() =>
      remarkParser.process(descriptions).then((parsed) => {
        setModalDescriptions(parsed.toString());
        return setModal(true);
      })
    );
  const cards = useMemo(() => {
    switch (mode) {
      case 'shop':
        return shopContents.data?.data.map((card, index) => (
          <Card
            key={index}
            onClick={() =>
              contentsImagesHandler(
                card.id,
                card.attributes.shopImages.data.attributes.Descriptions
              )
            }
            backgroundColor="#ffd401"
            header={{ title: card.attributes.title }}
            media={{
              url: card.attributes.image.data.attributes.formats.small.url,
              alt: card.attributes.image.data.attributes.name,
            }}
          />
        ));

      case 'contents':
        return contents.data?.data.map((card, index) => (
          <Card
            key={index}
            onClick={() =>
              contentsImagesHandler(
                card.id,
                card.attributes.contentsImages.data.attributes.Descriptions
              )
            }
            backgroundColor="#ffd401"
            header={{ title: card.attributes.title }}
            media={{
              url: card.attributes.image.data.attributes.formats.small.url,
              alt: card.attributes.image.data.attributes.name,
            }}
          />
        ));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopContents.data, contents.data]);

  return (
    <Grid container direction="column" marginTop={15}>
      <Grid container id="header">
        <Toggler {...{ mode, setMode }} />
      </Grid>
      <Grid container spacing={2}>
        {cards}
      </Grid>
      <Modal
        open={modal}
        setOpen={setModal}
        images={(mode === 'shop' ? gotShopImages : gotImages).data || []}
        descriptions={modalDescriptions}
      />
    </Grid>
  );
};

export default memo(MainPage);
