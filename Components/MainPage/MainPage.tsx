import { memo, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import lazy from 'next/dynamic';
import { useLazyImagesQuery } from 'api/contentsImages';
import { useLazyShopImagesQuery } from 'api/shopImages';
import remarkParser from 'Constants/remarkParser';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

/** @module lazy @constant import */
const Toggler = lazy(() => import('Components/MainPage/Items/Toggler'));
const Modal = lazy(() => import('Modules/Modal'));
const ContentsCards = lazy(() => import('Components/MainPage/Items/Contents'));
const ShopCards = lazy(() => import('pages/shop'));
const Preview = lazy(() => import('Components/Preview/Preview'));

const MainPage: NextPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modalDescriptions, setModalDescriptions] = useState('');
  const [getImages, gotImages] = useLazyImagesQuery();
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery();

  const contentsImagesHandler = (id?: number) =>
    id
      ? () =>
          (shopMode ? getShopImages : getImages)(id)
            .unwrap()
            .then((res) =>
              remarkParser.process(res.descriptions).then((parsed) => {
                setModalDescriptions(parsed.toString());
                return setModal(true);
              })
            )
      : undefined;

  return (
    <Grid container direction="column" marginTop={15} marginX={2}>
      <Grid container id="header">
        <Toggler />
      </Grid>
      <Grid container gap={3} marginTop={2} justifyContent="center">
        {shopMode ? (
          <ShopCards {...{ contentsImagesHandler }} />
        ) : (
          <ContentsCards {...{ contentsImagesHandler }} />
        )}
      </Grid>
      <Modal
        open={modal}
        setOpen={setModal}
        images={
          (shopMode
            ? gotShopImages.data?.shopImages
            : gotImages.data?.contentsImages) || []
        }
        descriptions={modalDescriptions}
      />
      <Preview />
    </Grid>
  );
};

export default memo(MainPage);
