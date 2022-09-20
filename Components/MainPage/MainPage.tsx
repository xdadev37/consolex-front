import { memo, useState, useMemo } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import lazy from 'next/dynamic';
import { useShopQuery } from 'api/shop';
import { useContentsQuery } from 'api/contents';
import { useLazyImagesQuery } from 'api/images';
import { useLazyShopImagesQuery } from 'api/shopImages';
import remarkParser from 'Constants/remarkParser';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import type { NextPage } from 'next';

/** @module lazy @constant import */
const Toggler = lazy(() => import('Components/MainPage/Items/Toggler'));
const Card = lazy(() => import('Modules/Card'));
const Modal = lazy(() => import('Modules/Modal'));
const Loading = lazy(() => import('Modules/Loading'));

const MainPage: NextPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const shopMode = router.asPath !== '/contents';
  const [modalDescriptions, setModalDescriptions] = useState('');
  const shopContents = useShopQuery(undefined, {
    skip: router.asPath === '/contents',
  });
  const contents = useContentsQuery(undefined, {
    skip: shopMode,
  });
  const [getImages, gotImages] = useLazyImagesQuery();
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery();
  const contentsImagesHandler = (id: number, descriptions: string) =>
    (shopMode ? getShopImages : getImages)(id).then(() =>
      remarkParser.process(descriptions).then((parsed) => {
        setModalDescriptions(parsed.toString());
        return setModal(true);
      })
    );
  const cards = useMemo(
    () =>
      shopMode
        ? shopContents.data?.map((card, index) => (
            <Card
              key={index}
              onClick={
                card.shopImages
                  ? () =>
                      contentsImagesHandler(
                        card.id,
                        card.shopImages?.Descriptions || ''
                      )
                  : undefined
              }
              backgroundColor="#ffd401"
              header={{
                title: card.title,
                subheader: 'تماس برای اطلاعات بیش تر',
                actions: (
                  <Link href="#footer" color="primary.100">
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                ),
              }}
              media={{
                url: card.image.formats.small.url,
                alt: card.image.name,
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sm={6} md={6} lg={6}>
                  <Typography color="primary.100">قیمت</Typography>
                </Grid>
                {card.price ? (
                  <Grid
                    item
                    alignItems="baseline"
                    display="flex"
                    sm={6}
                    md={6}
                    lg={6}
                  >
                    <Typography variant="subtitle1">{card.price}</Typography>
                    &nbsp;
                    <Typography
                      component="sub"
                      variant="caption"
                      color="primary.200"
                    >
                      تومان
                    </Typography>
                  </Grid>
                ) : (
                  <Typography variant="caption">تماس بگیرید</Typography>
                )}
              </Grid>
              <Typography variant="caption">{card.ps || ''}</Typography>
            </Card>
          ))
        : contents.data?.map((card, index) => (
            <Card
              key={index}
              onClick={
                card.contentsImages
                  ? () =>
                      contentsImagesHandler(
                        card.id,
                        card.contentsImages?.Descriptions || ''
                      )
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
          )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shopContents.data, contents.data]
  );

  return (
    <Grid container direction="column" marginTop={15}>
      <Grid container id="header">
        <Toggler />
      </Grid>
      <Grid container gap={3} marginTop={2} justifyContent="center">
        {cards}
      </Grid>
      <Modal
        open={modal}
        setOpen={setModal}
        images={(shopMode ? gotShopImages : gotImages).data || []}
        descriptions={modalDescriptions}
      />
      <Loading
        open={
          (shopContents || contents || gotShopImages || gotImages).isFetching
        }
      />
    </Grid>
  );
};

export default memo(MainPage);
