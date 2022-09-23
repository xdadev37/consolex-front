import { memo, useState } from 'react';
import { Grid, Slide } from '@mui/material';
import lazy from 'next/dynamic';
import { useLazyImagesQuery } from 'api/contentsImages';
import { useLazyShopImagesQuery } from 'api/shopImages';
import remarkParser from 'Constants/remarkParser';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

/** @module lazy @constant import */
const Toggler = lazy(() => import('Components/MainPage/Items/Toggler'));
const Modal = lazy(() => import('Modules/Modal'));
const Loading = lazy(() => import('Modules/Loading'));
const ContentsCards = lazy(() => import('Components/MainPage/Items/Contents'));
const ShopCards = lazy(() => import('Components/MainPage/Items/Shop'));

const MainPage: NextPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const shopMode = router.asPath !== '/contents';
  const [modalDescriptions, setModalDescriptions] = useState('');
  const [getImages, gotImages] = useLazyImagesQuery();
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery();

  const contentsImagesHandler = (id: number) =>
    (shopMode ? getShopImages : getImages)(id)
      .unwrap()
      .then((res) =>
        remarkParser.process(res.descriptions).then((parsed) => {
          setModalDescriptions(parsed.toString());
          return setModal(true);
        })
      );

  return (
    <Grid container direction="column" marginTop={15}>
      <Grid container id="header">
        <Toggler />
      </Grid>
      <Slide direction="up" in>
        <Grid container gap={3} marginTop={2} justifyContent="center">
          {shopMode ? (
            <ShopCards {...{ contentsImagesHandler }} />
          ) : (
            <ContentsCards {...{ contentsImagesHandler }} />
          )}
        </Grid>
      </Slide>
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
      <Loading open={(gotShopImages || gotImages).isFetching} />
    </Grid>
  );
};

export default memo(MainPage);
