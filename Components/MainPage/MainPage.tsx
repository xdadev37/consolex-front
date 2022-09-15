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
  const [mode, setMode] = useState(router.asPath);
  const [modal, setModal] = useState(false);
  const [modalDescriptions, setModalDescriptions] = useState('');
  const shopContents = useShopQuery(undefined, { skip: mode === '/contents' });
  const contents = useContentsQuery(undefined, { skip: mode !== '/contents' });
  const [getImages, gotImages] = useLazyImagesQuery();
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery();
  const contentsImagesHandler = (id: number, descriptions: string) =>
    (mode !== '/contents' ? getShopImages : getImages)(id).then(() =>
      remarkParser.process(descriptions).then((parsed) => {
        setModalDescriptions(parsed.toString());
        return setModal(true);
      })
    );
  const cards = useMemo(
    () =>
      mode !== '/contents'
        ? shopContents.data?.data.map((card, index) => (
            <Card
              key={index}
              onClick={
                card.attributes.shopImages
                  ? () =>
                      contentsImagesHandler(
                        card.id,
                        card.attributes.shopImages?.data.attributes
                          .Descriptions || ''
                      )
                  : undefined
              }
              backgroundColor="#ffd401"
              header={{
                title: card.attributes.title,
                subheader: 'تماس برای اطلاعات بیش تر',
                actions: (
                  <Link href="#footer" color="primary.100">
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                ),
              }}
              media={{
                url: card.attributes.image.data.attributes.formats.small.url,
                alt: card.attributes.image.data.attributes.name,
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
                {card.attributes.price ? (
                  <Grid
                    item
                    alignItems="baseline"
                    display="flex"
                    sm={6}
                    md={6}
                    lg={6}
                  >
                    <Typography variant="subtitle1">
                      {card.attributes.price}
                    </Typography>
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
              <Typography variant="caption">
                {card.attributes.ps || ''}
              </Typography>
            </Card>
          ))
        : contents.data?.data.map((card, index) => (
            <Card
              key={index}
              onClick={
                card.attributes.contentsImages
                  ? () =>
                      contentsImagesHandler(
                        card.id,
                        card.attributes.contentsImages?.data.attributes
                          .Descriptions || ''
                      )
                  : undefined
              }
              backgroundColor="#ffd401"
              header={{ title: card.attributes.title }}
              media={{
                url: card.attributes.image.data.attributes.formats.small.url,
                alt: card.attributes.image.data.attributes.name,
              }}
            >
              <Typography>{card.attributes.ps}</Typography>
            </Card>
          )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shopContents.data, contents.data]
  );

  return (
    <Grid container direction="column" marginTop={15}>
      <Grid container id="header">
        <Toggler {...{ mode, setMode }} />
      </Grid>
      <Grid container gap={3} marginTop={2}>
        {cards}
      </Grid>
      <Modal
        open={modal}
        setOpen={setModal}
        images={(mode !== '/contents' ? gotShopImages : gotImages).data || []}
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
